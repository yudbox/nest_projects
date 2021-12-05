import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { hhData } from 'src/top-page/interfaces/top-page.interface';
import { API_URL, CLUSTER_FIND_ERROR, SALARY_CLUSTER_ID } from './hh.constants';
import { HhResponse } from './interfaces/models.interface';

@Injectable()
export class HhService {
  private token: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.token = this.configService.get('HH_TOKEN') ?? '';
  }

  async getData(text: string) {
    try {
      const { data } = await lastValueFrom(
        this.httpService.get<HhResponse>(API_URL.vacancies, {
          params: {
            text,
            clusters: true,
          },
          headers: {
            'User-Agent': 'OwlTop/1.0 (antonlarichev@gmail.com)',
            Authorization: `Bearer ${this.token}`,
          },
        }),
      );
      return this.parseData(data);
    } catch (error) {}
  }

  private parseData(data: HhResponse): hhData {
    const salaryCluster = data.clusters.find(
      (cluster) => cluster.id == SALARY_CLUSTER_ID,
    );
    if (!salaryCluster) {
      throw new Error(CLUSTER_FIND_ERROR);
    }

    const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name);
    const middleSalary = this.getSalaryFromString(
      salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
    );
    const seniorSalary = this.getSalaryFromString(
      salaryCluster.items[salaryCluster.items.length - 1].name,
    );
    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
    };
  }

  private getSalaryFromString(salaryString: string) {
    const numberRegExp = /(\d+)/g;
    const salaryValue = salaryString.match(numberRegExp);
    if (!salaryValue) {
      return 0;
    }
    return Number(salaryValue[0]);
  }
}
