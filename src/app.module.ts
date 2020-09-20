import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthController } from './controllers/auth.controller';
import { UsuarioService } from './services/usuario.service';
import { Lista } from './entities/lista.entity';
import { Participante } from './entities/participante.entity';
import { ListaController } from './controllers/lista.controller';
import { ListaService } from './services/lista.service';

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
        Usuario,
        Lista,
        Participante
      ],
      synchronize: true
    })
  ],
  controllers: [
    AppController,
    AuthController,
    ListaController
  ],
  providers: [
    AppService,
    UsuarioService,
    ListaService
  ],
})
export class AppModule {}
