import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id: id } });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  async update(id: number, employeeData: Partial<Employee>): Promise<Employee> {
    const employee = await this.findById(id);
    return this.employeeRepository.save({ ...employee, ...employeeData });
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findById(id);
    await this.employeeRepository.remove(employee);
  }
}
