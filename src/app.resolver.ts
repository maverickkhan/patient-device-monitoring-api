import {
    Resolver,
    Query,
    Args,
  } from '@nestjs/graphql';
  import { AppService } from './app.service';
  
  @Resolver()
  export class AppResolver {
    constructor(private readonly appService: AppService) {}
  
    @Query(() => String)
    healthCheck() {
    //   return this.appService.healthCheck();
    return 'Server is up and running'
    }
  
    // @Query(() => String, { name: 'currency_covert' })
    // currency_covert(
    //   @Args('currencyConversionInput')
    //   currencyConversionInput: CurrencyConversionInput,
    // ) {
    //   return this.appService.convertCurrency(currencyConversionInput);
    // }
  }