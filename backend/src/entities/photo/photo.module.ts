import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PhotoService} from './photo.service';
import {Photo} from './photo.entity';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Photo]),
    ],
    providers: [PhotoService],
    exports: [PhotoService],
})
export class PhotoModule {}
