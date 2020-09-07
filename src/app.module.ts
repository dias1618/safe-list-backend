import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: "postgres",
      password: "axlrby216",
      database: "safelist",
      entities: [
        Usuario
      ],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
