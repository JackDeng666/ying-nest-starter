import { SetMetadata } from '@nestjs/common';

export const NoToken = () => SetMetadata('noToken', true);
