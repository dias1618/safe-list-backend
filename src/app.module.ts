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
import { ParticipanteController } from './controllers/participante.controller';
import { ParticipanteService } from './services/participante.service';
import { Cadeira } from './entities/cadeira.entity';
import { Banco } from './entities/banco.entity';
import { BancoController } from './controllers/banco.controller';
import { BancoService } from './services/banco.service';
import { CadeiraController } from './controllers/cadeira.controller';
import { CadeiraService } from './services/cadeira.service';
import { BancoRepository } from './repositories/banco.repository';
import { CadeiraRepository } from './repositories/cadeira.repository';
import { BancoValidator } from './validators/banco.validator';
import { ParticipanteValidator } from './validators/participante.validator';
import { ParticipanteRepository } from './repositories/participante.repository';
import { ListaRepository } from './repositories/lista.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
      type: 'postgres',
      host: 'docker_postgres_1',
      //host: 'localhost',
      port: 5432,
      //port: 15432,
      username: "postgres",
      password: "axlrby216",
      database: "safelist",
      entities: [
        Usuario,
        Lista,
        Participante,
        Cadeira,
        Banco
      ],
      synchronize: true
    })
  ],
  controllers: [
    AppController,
    AuthController,
    ListaController,
    ParticipanteController,
    BancoController,
    CadeiraController,
  ],
  providers: [
    AppService,
    UsuarioService,
    ListaRepository,
    ListaService,
    ParticipanteService,
    BancoRepository,
    BancoService,
    BancoValidator,
    CadeiraService,
    CadeiraRepository,
    ParticipanteValidator,
    ParticipanteRepository,
  ],
})
export class AppModule {}
