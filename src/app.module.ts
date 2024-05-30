import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { TeamsModule } from './football/teams/teams.module';
import { PagesModule } from './pages/pages.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'flower_shop_root',
    //   password: 'R!qx4453w',
    //   database: 'flower_shop_db',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: false, // Only for development. Should be false in production.
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'flower_shop_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, 
    }),
    ProductsModule,
    EmployeesModule,
    TeamsModule,
    PagesModule,
    UploadModule,
    AuthModule,
    UsersModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
