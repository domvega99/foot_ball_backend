import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() employeeData: Partial<Employee>): Promise<Employee> {
    return this.employeesService.create(employeeData);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() employeeData: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeesService.update(parseInt(id, 10), employeeData);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.employeesService.remove(+id);
  }
}
