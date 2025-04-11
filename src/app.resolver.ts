import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor() {}

  @Query(() => String)
  healthCheck() {
    return 'Server is up and running';
  }
}
