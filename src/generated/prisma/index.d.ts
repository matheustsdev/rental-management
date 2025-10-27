
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model categories
 * 
 */
export type categories = $Result.DefaultSelection<Prisma.$categoriesPayload>
/**
 * Model products
 * 
 */
export type products = $Result.DefaultSelection<Prisma.$productsPayload>
/**
 * Model rent_products
 * 
 */
export type rent_products = $Result.DefaultSelection<Prisma.$rent_productsPayload>
/**
 * Model rents
 * 
 */
export type rents = $Result.DefaultSelection<Prisma.$rentsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const availability_status: {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
  BUFFER_OCCUPIED: 'BUFFER_OCCUPIED'
};

export type availability_status = (typeof availability_status)[keyof typeof availability_status]


export const discount_type_enum: {
  PERCENTAGE: 'PERCENTAGE',
  FIXED: 'FIXED'
};

export type discount_type_enum = (typeof discount_type_enum)[keyof typeof discount_type_enum]


export const measures_type: {
  SUIT: 'SUIT',
  DRESS: 'DRESS'
};

export type measures_type = (typeof measures_type)[keyof typeof measures_type]

}

export type availability_status = $Enums.availability_status

export const availability_status: typeof $Enums.availability_status

export type discount_type_enum = $Enums.discount_type_enum

export const discount_type_enum: typeof $Enums.discount_type_enum

export type measures_type = $Enums.measures_type

export const measures_type: typeof $Enums.measures_type

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Categories
 * const categories = await prisma.categories.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Categories
   * const categories = await prisma.categories.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.categories`: Exposes CRUD operations for the **categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categories.findMany()
    * ```
    */
  get categories(): Prisma.categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.products`: Exposes CRUD operations for the **products** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.products.findMany()
    * ```
    */
  get products(): Prisma.productsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rent_products`: Exposes CRUD operations for the **rent_products** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rent_products
    * const rent_products = await prisma.rent_products.findMany()
    * ```
    */
  get rent_products(): Prisma.rent_productsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rents`: Exposes CRUD operations for the **rents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rents
    * const rents = await prisma.rents.findMany()
    * ```
    */
  get rents(): Prisma.rentsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    categories: 'categories',
    products: 'products',
    rent_products: 'rent_products',
    rents: 'rents'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "categories" | "products" | "rent_products" | "rents"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      categories: {
        payload: Prisma.$categoriesPayload<ExtArgs>
        fields: Prisma.categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findFirst: {
            args: Prisma.categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          findMany: {
            args: Prisma.categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          create: {
            args: Prisma.categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          createMany: {
            args: Prisma.categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          delete: {
            args: Prisma.categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          update: {
            args: Prisma.categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          deleteMany: {
            args: Prisma.categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>[]
          }
          upsert: {
            args: Prisma.categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoriesPayload>
          }
          aggregate: {
            args: Prisma.CategoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategories>
          }
          groupBy: {
            args: Prisma.categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriesCountAggregateOutputType> | number
          }
        }
      }
      products: {
        payload: Prisma.$productsPayload<ExtArgs>
        fields: Prisma.productsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.productsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.productsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>
          }
          findFirst: {
            args: Prisma.productsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.productsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>
          }
          findMany: {
            args: Prisma.productsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>[]
          }
          create: {
            args: Prisma.productsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>
          }
          createMany: {
            args: Prisma.productsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.productsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>[]
          }
          delete: {
            args: Prisma.productsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>
          }
          update: {
            args: Prisma.productsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>
          }
          deleteMany: {
            args: Prisma.productsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.productsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.productsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>[]
          }
          upsert: {
            args: Prisma.productsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$productsPayload>
          }
          aggregate: {
            args: Prisma.ProductsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducts>
          }
          groupBy: {
            args: Prisma.productsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductsGroupByOutputType>[]
          }
          count: {
            args: Prisma.productsCountArgs<ExtArgs>
            result: $Utils.Optional<ProductsCountAggregateOutputType> | number
          }
        }
      }
      rent_products: {
        payload: Prisma.$rent_productsPayload<ExtArgs>
        fields: Prisma.rent_productsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rent_productsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rent_productsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>
          }
          findFirst: {
            args: Prisma.rent_productsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rent_productsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>
          }
          findMany: {
            args: Prisma.rent_productsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>[]
          }
          create: {
            args: Prisma.rent_productsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>
          }
          createMany: {
            args: Prisma.rent_productsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rent_productsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>[]
          }
          delete: {
            args: Prisma.rent_productsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>
          }
          update: {
            args: Prisma.rent_productsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>
          }
          deleteMany: {
            args: Prisma.rent_productsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rent_productsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.rent_productsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>[]
          }
          upsert: {
            args: Prisma.rent_productsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rent_productsPayload>
          }
          aggregate: {
            args: Prisma.Rent_productsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRent_products>
          }
          groupBy: {
            args: Prisma.rent_productsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Rent_productsGroupByOutputType>[]
          }
          count: {
            args: Prisma.rent_productsCountArgs<ExtArgs>
            result: $Utils.Optional<Rent_productsCountAggregateOutputType> | number
          }
        }
      }
      rents: {
        payload: Prisma.$rentsPayload<ExtArgs>
        fields: Prisma.rentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>
          }
          findFirst: {
            args: Prisma.rentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>
          }
          findMany: {
            args: Prisma.rentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>[]
          }
          create: {
            args: Prisma.rentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>
          }
          createMany: {
            args: Prisma.rentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>[]
          }
          delete: {
            args: Prisma.rentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>
          }
          update: {
            args: Prisma.rentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>
          }
          deleteMany: {
            args: Prisma.rentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.rentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>[]
          }
          upsert: {
            args: Prisma.rentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rentsPayload>
          }
          aggregate: {
            args: Prisma.RentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRents>
          }
          groupBy: {
            args: Prisma.rentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.rentsCountArgs<ExtArgs>
            result: $Utils.Optional<RentsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    categories?: categoriesOmit
    products?: productsOmit
    rent_products?: rent_productsOmit
    rents?: rentsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoriesCountOutputType
   */

  export type CategoriesCountOutputType = {
    products: number
  }

  export type CategoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | CategoriesCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesCountOutputType
     */
    select?: CategoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriesCountOutputType without action
   */
  export type CategoriesCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productsWhereInput
  }


  /**
   * Count Type ProductsCountOutputType
   */

  export type ProductsCountOutputType = {
    rent_products: number
  }

  export type ProductsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rent_products?: boolean | ProductsCountOutputTypeCountRent_productsArgs
  }

  // Custom InputTypes
  /**
   * ProductsCountOutputType without action
   */
  export type ProductsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductsCountOutputType
     */
    select?: ProductsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductsCountOutputType without action
   */
  export type ProductsCountOutputTypeCountRent_productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rent_productsWhereInput
  }


  /**
   * Count Type RentsCountOutputType
   */

  export type RentsCountOutputType = {
    rent_products: number
  }

  export type RentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rent_products?: boolean | RentsCountOutputTypeCountRent_productsArgs
  }

  // Custom InputTypes
  /**
   * RentsCountOutputType without action
   */
  export type RentsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RentsCountOutputType
     */
    select?: RentsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RentsCountOutputType without action
   */
  export type RentsCountOutputTypeCountRent_productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rent_productsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model categories
   */

  export type AggregateCategories = {
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  export type CategoriesAvgAggregateOutputType = {
    post_return_buffer_days: number | null
  }

  export type CategoriesSumAggregateOutputType = {
    post_return_buffer_days: number | null
  }

  export type CategoriesMinAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted: boolean | null
    deleted_at: Date | null
    post_return_buffer_days: number | null
    measure_type: $Enums.measures_type | null
  }

  export type CategoriesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted: boolean | null
    deleted_at: Date | null
    post_return_buffer_days: number | null
    measure_type: $Enums.measures_type | null
  }

  export type CategoriesCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    deleted: number
    deleted_at: number
    post_return_buffer_days: number
    measure_type: number
    _all: number
  }


  export type CategoriesAvgAggregateInputType = {
    post_return_buffer_days?: true
  }

  export type CategoriesSumAggregateInputType = {
    post_return_buffer_days?: true
  }

  export type CategoriesMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    deleted?: true
    deleted_at?: true
    post_return_buffer_days?: true
    measure_type?: true
  }

  export type CategoriesMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    deleted?: true
    deleted_at?: true
    post_return_buffer_days?: true
    measure_type?: true
  }

  export type CategoriesCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    deleted?: true
    deleted_at?: true
    post_return_buffer_days?: true
    measure_type?: true
    _all?: true
  }

  export type CategoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to aggregate.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesMaxAggregateInputType
  }

  export type GetCategoriesAggregateType<T extends CategoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateCategories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategories[P]>
      : GetScalarType<T[P], AggregateCategories[P]>
  }




  export type categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoriesWhereInput
    orderBy?: categoriesOrderByWithAggregationInput | categoriesOrderByWithAggregationInput[]
    by: CategoriesScalarFieldEnum[] | CategoriesScalarFieldEnum
    having?: categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesCountAggregateInputType | true
    _avg?: CategoriesAvgAggregateInputType
    _sum?: CategoriesSumAggregateInputType
    _min?: CategoriesMinAggregateInputType
    _max?: CategoriesMaxAggregateInputType
  }

  export type CategoriesGroupByOutputType = {
    id: string
    name: string
    created_at: Date | null
    updated_at: Date | null
    deleted: boolean | null
    deleted_at: Date | null
    post_return_buffer_days: number | null
    measure_type: $Enums.measures_type | null
    _count: CategoriesCountAggregateOutputType | null
    _avg: CategoriesAvgAggregateOutputType | null
    _sum: CategoriesSumAggregateOutputType | null
    _min: CategoriesMinAggregateOutputType | null
    _max: CategoriesMaxAggregateOutputType | null
  }

  type GetCategoriesGroupByPayload<T extends categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesGroupByOutputType[P]>
        }
      >
    >


  export type categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
    post_return_buffer_days?: boolean
    measure_type?: boolean
    products?: boolean | categories$productsArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
    post_return_buffer_days?: boolean
    measure_type?: boolean
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
    post_return_buffer_days?: boolean
    measure_type?: boolean
  }, ExtArgs["result"]["categories"]>

  export type categoriesSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
    post_return_buffer_days?: boolean
    measure_type?: boolean
  }

  export type categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "created_at" | "updated_at" | "deleted" | "deleted_at" | "post_return_buffer_days" | "measure_type", ExtArgs["result"]["categories"]>
  export type categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | categories$productsArgs<ExtArgs>
    _count?: boolean | CategoriesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type categoriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type categoriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categories"
    objects: {
      products: Prisma.$productsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      created_at: Date | null
      updated_at: Date | null
      deleted: boolean | null
      deleted_at: Date | null
      post_return_buffer_days: number | null
      measure_type: $Enums.measures_type | null
    }, ExtArgs["result"]["categories"]>
    composites: {}
  }

  type categoriesGetPayload<S extends boolean | null | undefined | categoriesDefaultArgs> = $Result.GetResult<Prisma.$categoriesPayload, S>

  type categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriesCountAggregateInputType | true
    }

  export interface categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categories'], meta: { name: 'categories' } }
    /**
     * Find zero or one Categories that matches the filter.
     * @param {categoriesFindUniqueArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoriesFindUniqueArgs>(args: SelectSubset<T, categoriesFindUniqueArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoriesFindUniqueOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoriesFindFirstArgs>(args?: SelectSubset<T, categoriesFindFirstArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindFirstOrThrowArgs} args - Arguments to find a Categories
     * @example
     * // Get one Categories
     * const categories = await prisma.categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categories.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesWithIdOnly = await prisma.categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoriesFindManyArgs>(args?: SelectSubset<T, categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categories.
     * @param {categoriesCreateArgs} args - Arguments to create a Categories.
     * @example
     * // Create one Categories
     * const Categories = await prisma.categories.create({
     *   data: {
     *     // ... data to create a Categories
     *   }
     * })
     * 
     */
    create<T extends categoriesCreateArgs>(args: SelectSubset<T, categoriesCreateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoriesCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoriesCreateManyArgs>(args?: SelectSubset<T, categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {categoriesCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categories = await prisma.categories.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoriesWithIdOnly = await prisma.categories.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoriesCreateManyAndReturnArgs>(args?: SelectSubset<T, categoriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categories.
     * @param {categoriesDeleteArgs} args - Arguments to delete one Categories.
     * @example
     * // Delete one Categories
     * const Categories = await prisma.categories.delete({
     *   where: {
     *     // ... filter to delete one Categories
     *   }
     * })
     * 
     */
    delete<T extends categoriesDeleteArgs>(args: SelectSubset<T, categoriesDeleteArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categories.
     * @param {categoriesUpdateArgs} args - Arguments to update one Categories.
     * @example
     * // Update one Categories
     * const categories = await prisma.categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoriesUpdateArgs>(args: SelectSubset<T, categoriesUpdateArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoriesDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoriesDeleteManyArgs>(args?: SelectSubset<T, categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoriesUpdateManyArgs>(args: SelectSubset<T, categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {categoriesUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const categories = await prisma.categories.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoriesWithIdOnly = await prisma.categories.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends categoriesUpdateManyAndReturnArgs>(args: SelectSubset<T, categoriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categories.
     * @param {categoriesUpsertArgs} args - Arguments to update or create a Categories.
     * @example
     * // Update or create a Categories
     * const categories = await prisma.categories.upsert({
     *   create: {
     *     // ... data to create a Categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categories we want to update
     *   }
     * })
     */
    upsert<T extends categoriesUpsertArgs>(args: SelectSubset<T, categoriesUpsertArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categories.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoriesCountArgs>(
      args?: Subset<T, categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriesAggregateArgs>(args: Subset<T, CategoriesAggregateArgs>): Prisma.PrismaPromise<GetCategoriesAggregateType<T>>

    /**
     * Group by Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoriesGroupByArgs['orderBy'] }
        : { orderBy?: categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categories model
   */
  readonly fields: categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends categories$productsArgs<ExtArgs> = {}>(args?: Subset<T, categories$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the categories model
   */
  interface categoriesFieldRefs {
    readonly id: FieldRef<"categories", 'String'>
    readonly name: FieldRef<"categories", 'String'>
    readonly created_at: FieldRef<"categories", 'DateTime'>
    readonly updated_at: FieldRef<"categories", 'DateTime'>
    readonly deleted: FieldRef<"categories", 'Boolean'>
    readonly deleted_at: FieldRef<"categories", 'DateTime'>
    readonly post_return_buffer_days: FieldRef<"categories", 'Int'>
    readonly measure_type: FieldRef<"categories", 'measures_type'>
  }
    

  // Custom InputTypes
  /**
   * categories findUnique
   */
  export type categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findUniqueOrThrow
   */
  export type categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories findFirst
   */
  export type categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findFirstOrThrow
   */
  export type categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories findMany
   */
  export type categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoriesOrderByWithRelationInput | categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoriesScalarFieldEnum | CategoriesScalarFieldEnum[]
  }

  /**
   * categories create
   */
  export type categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a categories.
     */
    data: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
  }

  /**
   * categories createMany
   */
  export type categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categories createManyAndReturn
   */
  export type categoriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * The data used to create many categories.
     */
    data: categoriesCreateManyInput | categoriesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categories update
   */
  export type categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a categories.
     */
    data: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
    /**
     * Choose, which categories to update.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories updateMany
   */
  export type categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * categories updateManyAndReturn
   */
  export type categoriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * The data used to update categories.
     */
    data: XOR<categoriesUpdateManyMutationInput, categoriesUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * categories upsert
   */
  export type categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the categories to update in case it exists.
     */
    where: categoriesWhereUniqueInput
    /**
     * In case the categories found by the `where` argument doesn't exist, create a new categories with this data.
     */
    create: XOR<categoriesCreateInput, categoriesUncheckedCreateInput>
    /**
     * In case the categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoriesUpdateInput, categoriesUncheckedUpdateInput>
  }

  /**
   * categories delete
   */
  export type categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    /**
     * Filter which categories to delete.
     */
    where: categoriesWhereUniqueInput
  }

  /**
   * categories deleteMany
   */
  export type categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoriesWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * categories.products
   */
  export type categories$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    where?: productsWhereInput
    orderBy?: productsOrderByWithRelationInput | productsOrderByWithRelationInput[]
    cursor?: productsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductsScalarFieldEnum | ProductsScalarFieldEnum[]
  }

  /**
   * categories without action
   */
  export type categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
  }


  /**
   * Model products
   */

  export type AggregateProducts = {
    _count: ProductsCountAggregateOutputType | null
    _avg: ProductsAvgAggregateOutputType | null
    _sum: ProductsSumAggregateOutputType | null
    _min: ProductsMinAggregateOutputType | null
    _max: ProductsMaxAggregateOutputType | null
  }

  export type ProductsAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductsSumAggregateOutputType = {
    price: Decimal | null
  }

  export type ProductsMinAggregateOutputType = {
    id: string | null
    reference: string | null
    description: string | null
    receipt_description: string | null
    category_id: string | null
    price: Decimal | null
    created_at: Date | null
    updated_at: Date | null
    deleted: boolean | null
    deleted_at: Date | null
  }

  export type ProductsMaxAggregateOutputType = {
    id: string | null
    reference: string | null
    description: string | null
    receipt_description: string | null
    category_id: string | null
    price: Decimal | null
    created_at: Date | null
    updated_at: Date | null
    deleted: boolean | null
    deleted_at: Date | null
  }

  export type ProductsCountAggregateOutputType = {
    id: number
    reference: number
    description: number
    receipt_description: number
    category_id: number
    price: number
    created_at: number
    updated_at: number
    deleted: number
    deleted_at: number
    _all: number
  }


  export type ProductsAvgAggregateInputType = {
    price?: true
  }

  export type ProductsSumAggregateInputType = {
    price?: true
  }

  export type ProductsMinAggregateInputType = {
    id?: true
    reference?: true
    description?: true
    receipt_description?: true
    category_id?: true
    price?: true
    created_at?: true
    updated_at?: true
    deleted?: true
    deleted_at?: true
  }

  export type ProductsMaxAggregateInputType = {
    id?: true
    reference?: true
    description?: true
    receipt_description?: true
    category_id?: true
    price?: true
    created_at?: true
    updated_at?: true
    deleted?: true
    deleted_at?: true
  }

  export type ProductsCountAggregateInputType = {
    id?: true
    reference?: true
    description?: true
    receipt_description?: true
    category_id?: true
    price?: true
    created_at?: true
    updated_at?: true
    deleted?: true
    deleted_at?: true
    _all?: true
  }

  export type ProductsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which products to aggregate.
     */
    where?: productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productsOrderByWithRelationInput | productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned products
    **/
    _count?: true | ProductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductsMaxAggregateInputType
  }

  export type GetProductsAggregateType<T extends ProductsAggregateArgs> = {
        [P in keyof T & keyof AggregateProducts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducts[P]>
      : GetScalarType<T[P], AggregateProducts[P]>
  }




  export type productsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: productsWhereInput
    orderBy?: productsOrderByWithAggregationInput | productsOrderByWithAggregationInput[]
    by: ProductsScalarFieldEnum[] | ProductsScalarFieldEnum
    having?: productsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductsCountAggregateInputType | true
    _avg?: ProductsAvgAggregateInputType
    _sum?: ProductsSumAggregateInputType
    _min?: ProductsMinAggregateInputType
    _max?: ProductsMaxAggregateInputType
  }

  export type ProductsGroupByOutputType = {
    id: string
    reference: string
    description: string | null
    receipt_description: string | null
    category_id: string | null
    price: Decimal
    created_at: Date | null
    updated_at: Date | null
    deleted: boolean | null
    deleted_at: Date | null
    _count: ProductsCountAggregateOutputType | null
    _avg: ProductsAvgAggregateOutputType | null
    _sum: ProductsSumAggregateOutputType | null
    _min: ProductsMinAggregateOutputType | null
    _max: ProductsMaxAggregateOutputType | null
  }

  type GetProductsGroupByPayload<T extends productsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductsGroupByOutputType[P]>
            : GetScalarType<T[P], ProductsGroupByOutputType[P]>
        }
      >
    >


  export type productsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reference?: boolean
    description?: boolean
    receipt_description?: boolean
    category_id?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
    categories?: boolean | products$categoriesArgs<ExtArgs>
    rent_products?: boolean | products$rent_productsArgs<ExtArgs>
    _count?: boolean | ProductsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["products"]>

  export type productsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reference?: boolean
    description?: boolean
    receipt_description?: boolean
    category_id?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
    categories?: boolean | products$categoriesArgs<ExtArgs>
  }, ExtArgs["result"]["products"]>

  export type productsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reference?: boolean
    description?: boolean
    receipt_description?: boolean
    category_id?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
    categories?: boolean | products$categoriesArgs<ExtArgs>
  }, ExtArgs["result"]["products"]>

  export type productsSelectScalar = {
    id?: boolean
    reference?: boolean
    description?: boolean
    receipt_description?: boolean
    category_id?: boolean
    price?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted?: boolean
    deleted_at?: boolean
  }

  export type productsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reference" | "description" | "receipt_description" | "category_id" | "price" | "created_at" | "updated_at" | "deleted" | "deleted_at", ExtArgs["result"]["products"]>
  export type productsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | products$categoriesArgs<ExtArgs>
    rent_products?: boolean | products$rent_productsArgs<ExtArgs>
    _count?: boolean | ProductsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type productsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | products$categoriesArgs<ExtArgs>
  }
  export type productsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | products$categoriesArgs<ExtArgs>
  }

  export type $productsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "products"
    objects: {
      categories: Prisma.$categoriesPayload<ExtArgs> | null
      rent_products: Prisma.$rent_productsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reference: string
      description: string | null
      receipt_description: string | null
      category_id: string | null
      price: Prisma.Decimal
      created_at: Date | null
      updated_at: Date | null
      deleted: boolean | null
      deleted_at: Date | null
    }, ExtArgs["result"]["products"]>
    composites: {}
  }

  type productsGetPayload<S extends boolean | null | undefined | productsDefaultArgs> = $Result.GetResult<Prisma.$productsPayload, S>

  type productsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<productsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductsCountAggregateInputType | true
    }

  export interface productsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['products'], meta: { name: 'products' } }
    /**
     * Find zero or one Products that matches the filter.
     * @param {productsFindUniqueArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends productsFindUniqueArgs>(args: SelectSubset<T, productsFindUniqueArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Products that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {productsFindUniqueOrThrowArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends productsFindUniqueOrThrowArgs>(args: SelectSubset<T, productsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsFindFirstArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends productsFindFirstArgs>(args?: SelectSubset<T, productsFindFirstArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Products that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsFindFirstOrThrowArgs} args - Arguments to find a Products
     * @example
     * // Get one Products
     * const products = await prisma.products.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends productsFindFirstOrThrowArgs>(args?: SelectSubset<T, productsFindFirstOrThrowArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.products.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.products.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productsWithIdOnly = await prisma.products.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends productsFindManyArgs>(args?: SelectSubset<T, productsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Products.
     * @param {productsCreateArgs} args - Arguments to create a Products.
     * @example
     * // Create one Products
     * const Products = await prisma.products.create({
     *   data: {
     *     // ... data to create a Products
     *   }
     * })
     * 
     */
    create<T extends productsCreateArgs>(args: SelectSubset<T, productsCreateArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {productsCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const products = await prisma.products.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends productsCreateManyArgs>(args?: SelectSubset<T, productsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {productsCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const products = await prisma.products.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productsWithIdOnly = await prisma.products.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends productsCreateManyAndReturnArgs>(args?: SelectSubset<T, productsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Products.
     * @param {productsDeleteArgs} args - Arguments to delete one Products.
     * @example
     * // Delete one Products
     * const Products = await prisma.products.delete({
     *   where: {
     *     // ... filter to delete one Products
     *   }
     * })
     * 
     */
    delete<T extends productsDeleteArgs>(args: SelectSubset<T, productsDeleteArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Products.
     * @param {productsUpdateArgs} args - Arguments to update one Products.
     * @example
     * // Update one Products
     * const products = await prisma.products.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends productsUpdateArgs>(args: SelectSubset<T, productsUpdateArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {productsDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.products.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends productsDeleteManyArgs>(args?: SelectSubset<T, productsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const products = await prisma.products.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends productsUpdateManyArgs>(args: SelectSubset<T, productsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {productsUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const products = await prisma.products.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productsWithIdOnly = await prisma.products.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends productsUpdateManyAndReturnArgs>(args: SelectSubset<T, productsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Products.
     * @param {productsUpsertArgs} args - Arguments to update or create a Products.
     * @example
     * // Update or create a Products
     * const products = await prisma.products.upsert({
     *   create: {
     *     // ... data to create a Products
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Products we want to update
     *   }
     * })
     */
    upsert<T extends productsUpsertArgs>(args: SelectSubset<T, productsUpsertArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.products.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends productsCountArgs>(
      args?: Subset<T, productsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductsAggregateArgs>(args: Subset<T, ProductsAggregateArgs>): Prisma.PrismaPromise<GetProductsAggregateType<T>>

    /**
     * Group by Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {productsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends productsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: productsGroupByArgs['orderBy'] }
        : { orderBy?: productsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, productsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the products model
   */
  readonly fields: productsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for products.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__productsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends products$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, products$categoriesArgs<ExtArgs>>): Prisma__categoriesClient<$Result.GetResult<Prisma.$categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    rent_products<T extends products$rent_productsArgs<ExtArgs> = {}>(args?: Subset<T, products$rent_productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the products model
   */
  interface productsFieldRefs {
    readonly id: FieldRef<"products", 'String'>
    readonly reference: FieldRef<"products", 'String'>
    readonly description: FieldRef<"products", 'String'>
    readonly receipt_description: FieldRef<"products", 'String'>
    readonly category_id: FieldRef<"products", 'String'>
    readonly price: FieldRef<"products", 'Decimal'>
    readonly created_at: FieldRef<"products", 'DateTime'>
    readonly updated_at: FieldRef<"products", 'DateTime'>
    readonly deleted: FieldRef<"products", 'Boolean'>
    readonly deleted_at: FieldRef<"products", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * products findUnique
   */
  export type productsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * Filter, which products to fetch.
     */
    where: productsWhereUniqueInput
  }

  /**
   * products findUniqueOrThrow
   */
  export type productsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * Filter, which products to fetch.
     */
    where: productsWhereUniqueInput
  }

  /**
   * products findFirst
   */
  export type productsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * Filter, which products to fetch.
     */
    where?: productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productsOrderByWithRelationInput | productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for products.
     */
    cursor?: productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of products.
     */
    distinct?: ProductsScalarFieldEnum | ProductsScalarFieldEnum[]
  }

  /**
   * products findFirstOrThrow
   */
  export type productsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * Filter, which products to fetch.
     */
    where?: productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productsOrderByWithRelationInput | productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for products.
     */
    cursor?: productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of products.
     */
    distinct?: ProductsScalarFieldEnum | ProductsScalarFieldEnum[]
  }

  /**
   * products findMany
   */
  export type productsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * Filter, which products to fetch.
     */
    where?: productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of products to fetch.
     */
    orderBy?: productsOrderByWithRelationInput | productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing products.
     */
    cursor?: productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` products.
     */
    skip?: number
    distinct?: ProductsScalarFieldEnum | ProductsScalarFieldEnum[]
  }

  /**
   * products create
   */
  export type productsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * The data needed to create a products.
     */
    data: XOR<productsCreateInput, productsUncheckedCreateInput>
  }

  /**
   * products createMany
   */
  export type productsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many products.
     */
    data: productsCreateManyInput | productsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * products createManyAndReturn
   */
  export type productsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * The data used to create many products.
     */
    data: productsCreateManyInput | productsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * products update
   */
  export type productsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * The data needed to update a products.
     */
    data: XOR<productsUpdateInput, productsUncheckedUpdateInput>
    /**
     * Choose, which products to update.
     */
    where: productsWhereUniqueInput
  }

  /**
   * products updateMany
   */
  export type productsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update products.
     */
    data: XOR<productsUpdateManyMutationInput, productsUncheckedUpdateManyInput>
    /**
     * Filter which products to update
     */
    where?: productsWhereInput
    /**
     * Limit how many products to update.
     */
    limit?: number
  }

  /**
   * products updateManyAndReturn
   */
  export type productsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * The data used to update products.
     */
    data: XOR<productsUpdateManyMutationInput, productsUncheckedUpdateManyInput>
    /**
     * Filter which products to update
     */
    where?: productsWhereInput
    /**
     * Limit how many products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * products upsert
   */
  export type productsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * The filter to search for the products to update in case it exists.
     */
    where: productsWhereUniqueInput
    /**
     * In case the products found by the `where` argument doesn't exist, create a new products with this data.
     */
    create: XOR<productsCreateInput, productsUncheckedCreateInput>
    /**
     * In case the products was found with the provided `where` argument, update it with this data.
     */
    update: XOR<productsUpdateInput, productsUncheckedUpdateInput>
  }

  /**
   * products delete
   */
  export type productsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
    /**
     * Filter which products to delete.
     */
    where: productsWhereUniqueInput
  }

  /**
   * products deleteMany
   */
  export type productsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which products to delete
     */
    where?: productsWhereInput
    /**
     * Limit how many products to delete.
     */
    limit?: number
  }

  /**
   * products.categories
   */
  export type products$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categories
     */
    select?: categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categories
     */
    omit?: categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoriesInclude<ExtArgs> | null
    where?: categoriesWhereInput
  }

  /**
   * products.rent_products
   */
  export type products$rent_productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    where?: rent_productsWhereInput
    orderBy?: rent_productsOrderByWithRelationInput | rent_productsOrderByWithRelationInput[]
    cursor?: rent_productsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Rent_productsScalarFieldEnum | Rent_productsScalarFieldEnum[]
  }

  /**
   * products without action
   */
  export type productsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the products
     */
    select?: productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the products
     */
    omit?: productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: productsInclude<ExtArgs> | null
  }


  /**
   * Model rent_products
   */

  export type AggregateRent_products = {
    _count: Rent_productsCountAggregateOutputType | null
    _avg: Rent_productsAvgAggregateOutputType | null
    _sum: Rent_productsSumAggregateOutputType | null
    _min: Rent_productsMinAggregateOutputType | null
    _max: Rent_productsMaxAggregateOutputType | null
  }

  export type Rent_productsAvgAggregateOutputType = {
    product_price: Decimal | null
    actual_return_buffer_days: number | null
    bust: Decimal | null
    waist: Decimal | null
    hip: Decimal | null
    shoulder: Decimal | null
    sleeve: Decimal | null
    height: Decimal | null
    back: Decimal | null
  }

  export type Rent_productsSumAggregateOutputType = {
    product_price: Decimal | null
    actual_return_buffer_days: number | null
    bust: Decimal | null
    waist: Decimal | null
    hip: Decimal | null
    shoulder: Decimal | null
    sleeve: Decimal | null
    height: Decimal | null
    back: Decimal | null
  }

  export type Rent_productsMinAggregateOutputType = {
    id: string | null
    rent_id: string | null
    product_id: string | null
    product_price: Decimal | null
    product_description: string | null
    created_at: Date | null
    actual_return_buffer_days: number | null
    actual_return_date: Date | null
    bust: Decimal | null
    waist: Decimal | null
    hip: Decimal | null
    shoulder: Decimal | null
    sleeve: Decimal | null
    height: Decimal | null
    back: Decimal | null
    measure_type: $Enums.measures_type | null
  }

  export type Rent_productsMaxAggregateOutputType = {
    id: string | null
    rent_id: string | null
    product_id: string | null
    product_price: Decimal | null
    product_description: string | null
    created_at: Date | null
    actual_return_buffer_days: number | null
    actual_return_date: Date | null
    bust: Decimal | null
    waist: Decimal | null
    hip: Decimal | null
    shoulder: Decimal | null
    sleeve: Decimal | null
    height: Decimal | null
    back: Decimal | null
    measure_type: $Enums.measures_type | null
  }

  export type Rent_productsCountAggregateOutputType = {
    id: number
    rent_id: number
    product_id: number
    product_price: number
    product_description: number
    created_at: number
    actual_return_buffer_days: number
    actual_return_date: number
    bust: number
    waist: number
    hip: number
    shoulder: number
    sleeve: number
    height: number
    back: number
    measure_type: number
    _all: number
  }


  export type Rent_productsAvgAggregateInputType = {
    product_price?: true
    actual_return_buffer_days?: true
    bust?: true
    waist?: true
    hip?: true
    shoulder?: true
    sleeve?: true
    height?: true
    back?: true
  }

  export type Rent_productsSumAggregateInputType = {
    product_price?: true
    actual_return_buffer_days?: true
    bust?: true
    waist?: true
    hip?: true
    shoulder?: true
    sleeve?: true
    height?: true
    back?: true
  }

  export type Rent_productsMinAggregateInputType = {
    id?: true
    rent_id?: true
    product_id?: true
    product_price?: true
    product_description?: true
    created_at?: true
    actual_return_buffer_days?: true
    actual_return_date?: true
    bust?: true
    waist?: true
    hip?: true
    shoulder?: true
    sleeve?: true
    height?: true
    back?: true
    measure_type?: true
  }

  export type Rent_productsMaxAggregateInputType = {
    id?: true
    rent_id?: true
    product_id?: true
    product_price?: true
    product_description?: true
    created_at?: true
    actual_return_buffer_days?: true
    actual_return_date?: true
    bust?: true
    waist?: true
    hip?: true
    shoulder?: true
    sleeve?: true
    height?: true
    back?: true
    measure_type?: true
  }

  export type Rent_productsCountAggregateInputType = {
    id?: true
    rent_id?: true
    product_id?: true
    product_price?: true
    product_description?: true
    created_at?: true
    actual_return_buffer_days?: true
    actual_return_date?: true
    bust?: true
    waist?: true
    hip?: true
    shoulder?: true
    sleeve?: true
    height?: true
    back?: true
    measure_type?: true
    _all?: true
  }

  export type Rent_productsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rent_products to aggregate.
     */
    where?: rent_productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rent_products to fetch.
     */
    orderBy?: rent_productsOrderByWithRelationInput | rent_productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rent_productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rent_products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rent_products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned rent_products
    **/
    _count?: true | Rent_productsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Rent_productsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Rent_productsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Rent_productsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Rent_productsMaxAggregateInputType
  }

  export type GetRent_productsAggregateType<T extends Rent_productsAggregateArgs> = {
        [P in keyof T & keyof AggregateRent_products]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRent_products[P]>
      : GetScalarType<T[P], AggregateRent_products[P]>
  }




  export type rent_productsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rent_productsWhereInput
    orderBy?: rent_productsOrderByWithAggregationInput | rent_productsOrderByWithAggregationInput[]
    by: Rent_productsScalarFieldEnum[] | Rent_productsScalarFieldEnum
    having?: rent_productsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Rent_productsCountAggregateInputType | true
    _avg?: Rent_productsAvgAggregateInputType
    _sum?: Rent_productsSumAggregateInputType
    _min?: Rent_productsMinAggregateInputType
    _max?: Rent_productsMaxAggregateInputType
  }

  export type Rent_productsGroupByOutputType = {
    id: string
    rent_id: string
    product_id: string
    product_price: Decimal
    product_description: string
    created_at: Date | null
    actual_return_buffer_days: number | null
    actual_return_date: Date | null
    bust: Decimal | null
    waist: Decimal | null
    hip: Decimal | null
    shoulder: Decimal | null
    sleeve: Decimal | null
    height: Decimal | null
    back: Decimal | null
    measure_type: $Enums.measures_type
    _count: Rent_productsCountAggregateOutputType | null
    _avg: Rent_productsAvgAggregateOutputType | null
    _sum: Rent_productsSumAggregateOutputType | null
    _min: Rent_productsMinAggregateOutputType | null
    _max: Rent_productsMaxAggregateOutputType | null
  }

  type GetRent_productsGroupByPayload<T extends rent_productsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Rent_productsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Rent_productsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Rent_productsGroupByOutputType[P]>
            : GetScalarType<T[P], Rent_productsGroupByOutputType[P]>
        }
      >
    >


  export type rent_productsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rent_id?: boolean
    product_id?: boolean
    product_price?: boolean
    product_description?: boolean
    created_at?: boolean
    actual_return_buffer_days?: boolean
    actual_return_date?: boolean
    bust?: boolean
    waist?: boolean
    hip?: boolean
    shoulder?: boolean
    sleeve?: boolean
    height?: boolean
    back?: boolean
    measure_type?: boolean
    products?: boolean | productsDefaultArgs<ExtArgs>
    rents?: boolean | rentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rent_products"]>

  export type rent_productsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rent_id?: boolean
    product_id?: boolean
    product_price?: boolean
    product_description?: boolean
    created_at?: boolean
    actual_return_buffer_days?: boolean
    actual_return_date?: boolean
    bust?: boolean
    waist?: boolean
    hip?: boolean
    shoulder?: boolean
    sleeve?: boolean
    height?: boolean
    back?: boolean
    measure_type?: boolean
    products?: boolean | productsDefaultArgs<ExtArgs>
    rents?: boolean | rentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rent_products"]>

  export type rent_productsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rent_id?: boolean
    product_id?: boolean
    product_price?: boolean
    product_description?: boolean
    created_at?: boolean
    actual_return_buffer_days?: boolean
    actual_return_date?: boolean
    bust?: boolean
    waist?: boolean
    hip?: boolean
    shoulder?: boolean
    sleeve?: boolean
    height?: boolean
    back?: boolean
    measure_type?: boolean
    products?: boolean | productsDefaultArgs<ExtArgs>
    rents?: boolean | rentsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rent_products"]>

  export type rent_productsSelectScalar = {
    id?: boolean
    rent_id?: boolean
    product_id?: boolean
    product_price?: boolean
    product_description?: boolean
    created_at?: boolean
    actual_return_buffer_days?: boolean
    actual_return_date?: boolean
    bust?: boolean
    waist?: boolean
    hip?: boolean
    shoulder?: boolean
    sleeve?: boolean
    height?: boolean
    back?: boolean
    measure_type?: boolean
  }

  export type rent_productsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rent_id" | "product_id" | "product_price" | "product_description" | "created_at" | "actual_return_buffer_days" | "actual_return_date" | "bust" | "waist" | "hip" | "shoulder" | "sleeve" | "height" | "back" | "measure_type", ExtArgs["result"]["rent_products"]>
  export type rent_productsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | productsDefaultArgs<ExtArgs>
    rents?: boolean | rentsDefaultArgs<ExtArgs>
  }
  export type rent_productsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | productsDefaultArgs<ExtArgs>
    rents?: boolean | rentsDefaultArgs<ExtArgs>
  }
  export type rent_productsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | productsDefaultArgs<ExtArgs>
    rents?: boolean | rentsDefaultArgs<ExtArgs>
  }

  export type $rent_productsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "rent_products"
    objects: {
      products: Prisma.$productsPayload<ExtArgs>
      rents: Prisma.$rentsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rent_id: string
      product_id: string
      product_price: Prisma.Decimal
      product_description: string
      created_at: Date | null
      actual_return_buffer_days: number | null
      actual_return_date: Date | null
      bust: Prisma.Decimal | null
      waist: Prisma.Decimal | null
      hip: Prisma.Decimal | null
      shoulder: Prisma.Decimal | null
      sleeve: Prisma.Decimal | null
      height: Prisma.Decimal | null
      back: Prisma.Decimal | null
      measure_type: $Enums.measures_type
    }, ExtArgs["result"]["rent_products"]>
    composites: {}
  }

  type rent_productsGetPayload<S extends boolean | null | undefined | rent_productsDefaultArgs> = $Result.GetResult<Prisma.$rent_productsPayload, S>

  type rent_productsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<rent_productsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Rent_productsCountAggregateInputType | true
    }

  export interface rent_productsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['rent_products'], meta: { name: 'rent_products' } }
    /**
     * Find zero or one Rent_products that matches the filter.
     * @param {rent_productsFindUniqueArgs} args - Arguments to find a Rent_products
     * @example
     * // Get one Rent_products
     * const rent_products = await prisma.rent_products.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rent_productsFindUniqueArgs>(args: SelectSubset<T, rent_productsFindUniqueArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rent_products that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {rent_productsFindUniqueOrThrowArgs} args - Arguments to find a Rent_products
     * @example
     * // Get one Rent_products
     * const rent_products = await prisma.rent_products.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rent_productsFindUniqueOrThrowArgs>(args: SelectSubset<T, rent_productsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rent_products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rent_productsFindFirstArgs} args - Arguments to find a Rent_products
     * @example
     * // Get one Rent_products
     * const rent_products = await prisma.rent_products.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rent_productsFindFirstArgs>(args?: SelectSubset<T, rent_productsFindFirstArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rent_products that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rent_productsFindFirstOrThrowArgs} args - Arguments to find a Rent_products
     * @example
     * // Get one Rent_products
     * const rent_products = await prisma.rent_products.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rent_productsFindFirstOrThrowArgs>(args?: SelectSubset<T, rent_productsFindFirstOrThrowArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rent_products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rent_productsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rent_products
     * const rent_products = await prisma.rent_products.findMany()
     * 
     * // Get first 10 Rent_products
     * const rent_products = await prisma.rent_products.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rent_productsWithIdOnly = await prisma.rent_products.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends rent_productsFindManyArgs>(args?: SelectSubset<T, rent_productsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rent_products.
     * @param {rent_productsCreateArgs} args - Arguments to create a Rent_products.
     * @example
     * // Create one Rent_products
     * const Rent_products = await prisma.rent_products.create({
     *   data: {
     *     // ... data to create a Rent_products
     *   }
     * })
     * 
     */
    create<T extends rent_productsCreateArgs>(args: SelectSubset<T, rent_productsCreateArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rent_products.
     * @param {rent_productsCreateManyArgs} args - Arguments to create many Rent_products.
     * @example
     * // Create many Rent_products
     * const rent_products = await prisma.rent_products.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rent_productsCreateManyArgs>(args?: SelectSubset<T, rent_productsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rent_products and returns the data saved in the database.
     * @param {rent_productsCreateManyAndReturnArgs} args - Arguments to create many Rent_products.
     * @example
     * // Create many Rent_products
     * const rent_products = await prisma.rent_products.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rent_products and only return the `id`
     * const rent_productsWithIdOnly = await prisma.rent_products.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rent_productsCreateManyAndReturnArgs>(args?: SelectSubset<T, rent_productsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rent_products.
     * @param {rent_productsDeleteArgs} args - Arguments to delete one Rent_products.
     * @example
     * // Delete one Rent_products
     * const Rent_products = await prisma.rent_products.delete({
     *   where: {
     *     // ... filter to delete one Rent_products
     *   }
     * })
     * 
     */
    delete<T extends rent_productsDeleteArgs>(args: SelectSubset<T, rent_productsDeleteArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rent_products.
     * @param {rent_productsUpdateArgs} args - Arguments to update one Rent_products.
     * @example
     * // Update one Rent_products
     * const rent_products = await prisma.rent_products.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rent_productsUpdateArgs>(args: SelectSubset<T, rent_productsUpdateArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rent_products.
     * @param {rent_productsDeleteManyArgs} args - Arguments to filter Rent_products to delete.
     * @example
     * // Delete a few Rent_products
     * const { count } = await prisma.rent_products.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rent_productsDeleteManyArgs>(args?: SelectSubset<T, rent_productsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rent_products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rent_productsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rent_products
     * const rent_products = await prisma.rent_products.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rent_productsUpdateManyArgs>(args: SelectSubset<T, rent_productsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rent_products and returns the data updated in the database.
     * @param {rent_productsUpdateManyAndReturnArgs} args - Arguments to update many Rent_products.
     * @example
     * // Update many Rent_products
     * const rent_products = await prisma.rent_products.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rent_products and only return the `id`
     * const rent_productsWithIdOnly = await prisma.rent_products.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends rent_productsUpdateManyAndReturnArgs>(args: SelectSubset<T, rent_productsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rent_products.
     * @param {rent_productsUpsertArgs} args - Arguments to update or create a Rent_products.
     * @example
     * // Update or create a Rent_products
     * const rent_products = await prisma.rent_products.upsert({
     *   create: {
     *     // ... data to create a Rent_products
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rent_products we want to update
     *   }
     * })
     */
    upsert<T extends rent_productsUpsertArgs>(args: SelectSubset<T, rent_productsUpsertArgs<ExtArgs>>): Prisma__rent_productsClient<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rent_products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rent_productsCountArgs} args - Arguments to filter Rent_products to count.
     * @example
     * // Count the number of Rent_products
     * const count = await prisma.rent_products.count({
     *   where: {
     *     // ... the filter for the Rent_products we want to count
     *   }
     * })
    **/
    count<T extends rent_productsCountArgs>(
      args?: Subset<T, rent_productsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Rent_productsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rent_products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Rent_productsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Rent_productsAggregateArgs>(args: Subset<T, Rent_productsAggregateArgs>): Prisma.PrismaPromise<GetRent_productsAggregateType<T>>

    /**
     * Group by Rent_products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rent_productsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rent_productsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rent_productsGroupByArgs['orderBy'] }
        : { orderBy?: rent_productsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rent_productsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRent_productsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the rent_products model
   */
  readonly fields: rent_productsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for rent_products.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rent_productsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends productsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, productsDefaultArgs<ExtArgs>>): Prisma__productsClient<$Result.GetResult<Prisma.$productsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rents<T extends rentsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, rentsDefaultArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the rent_products model
   */
  interface rent_productsFieldRefs {
    readonly id: FieldRef<"rent_products", 'String'>
    readonly rent_id: FieldRef<"rent_products", 'String'>
    readonly product_id: FieldRef<"rent_products", 'String'>
    readonly product_price: FieldRef<"rent_products", 'Decimal'>
    readonly product_description: FieldRef<"rent_products", 'String'>
    readonly created_at: FieldRef<"rent_products", 'DateTime'>
    readonly actual_return_buffer_days: FieldRef<"rent_products", 'Int'>
    readonly actual_return_date: FieldRef<"rent_products", 'DateTime'>
    readonly bust: FieldRef<"rent_products", 'Decimal'>
    readonly waist: FieldRef<"rent_products", 'Decimal'>
    readonly hip: FieldRef<"rent_products", 'Decimal'>
    readonly shoulder: FieldRef<"rent_products", 'Decimal'>
    readonly sleeve: FieldRef<"rent_products", 'Decimal'>
    readonly height: FieldRef<"rent_products", 'Decimal'>
    readonly back: FieldRef<"rent_products", 'Decimal'>
    readonly measure_type: FieldRef<"rent_products", 'measures_type'>
  }
    

  // Custom InputTypes
  /**
   * rent_products findUnique
   */
  export type rent_productsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * Filter, which rent_products to fetch.
     */
    where: rent_productsWhereUniqueInput
  }

  /**
   * rent_products findUniqueOrThrow
   */
  export type rent_productsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * Filter, which rent_products to fetch.
     */
    where: rent_productsWhereUniqueInput
  }

  /**
   * rent_products findFirst
   */
  export type rent_productsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * Filter, which rent_products to fetch.
     */
    where?: rent_productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rent_products to fetch.
     */
    orderBy?: rent_productsOrderByWithRelationInput | rent_productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rent_products.
     */
    cursor?: rent_productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rent_products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rent_products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rent_products.
     */
    distinct?: Rent_productsScalarFieldEnum | Rent_productsScalarFieldEnum[]
  }

  /**
   * rent_products findFirstOrThrow
   */
  export type rent_productsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * Filter, which rent_products to fetch.
     */
    where?: rent_productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rent_products to fetch.
     */
    orderBy?: rent_productsOrderByWithRelationInput | rent_productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rent_products.
     */
    cursor?: rent_productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rent_products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rent_products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rent_products.
     */
    distinct?: Rent_productsScalarFieldEnum | Rent_productsScalarFieldEnum[]
  }

  /**
   * rent_products findMany
   */
  export type rent_productsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * Filter, which rent_products to fetch.
     */
    where?: rent_productsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rent_products to fetch.
     */
    orderBy?: rent_productsOrderByWithRelationInput | rent_productsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing rent_products.
     */
    cursor?: rent_productsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rent_products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rent_products.
     */
    skip?: number
    distinct?: Rent_productsScalarFieldEnum | Rent_productsScalarFieldEnum[]
  }

  /**
   * rent_products create
   */
  export type rent_productsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * The data needed to create a rent_products.
     */
    data: XOR<rent_productsCreateInput, rent_productsUncheckedCreateInput>
  }

  /**
   * rent_products createMany
   */
  export type rent_productsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many rent_products.
     */
    data: rent_productsCreateManyInput | rent_productsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rent_products createManyAndReturn
   */
  export type rent_productsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * The data used to create many rent_products.
     */
    data: rent_productsCreateManyInput | rent_productsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * rent_products update
   */
  export type rent_productsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * The data needed to update a rent_products.
     */
    data: XOR<rent_productsUpdateInput, rent_productsUncheckedUpdateInput>
    /**
     * Choose, which rent_products to update.
     */
    where: rent_productsWhereUniqueInput
  }

  /**
   * rent_products updateMany
   */
  export type rent_productsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update rent_products.
     */
    data: XOR<rent_productsUpdateManyMutationInput, rent_productsUncheckedUpdateManyInput>
    /**
     * Filter which rent_products to update
     */
    where?: rent_productsWhereInput
    /**
     * Limit how many rent_products to update.
     */
    limit?: number
  }

  /**
   * rent_products updateManyAndReturn
   */
  export type rent_productsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * The data used to update rent_products.
     */
    data: XOR<rent_productsUpdateManyMutationInput, rent_productsUncheckedUpdateManyInput>
    /**
     * Filter which rent_products to update
     */
    where?: rent_productsWhereInput
    /**
     * Limit how many rent_products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * rent_products upsert
   */
  export type rent_productsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * The filter to search for the rent_products to update in case it exists.
     */
    where: rent_productsWhereUniqueInput
    /**
     * In case the rent_products found by the `where` argument doesn't exist, create a new rent_products with this data.
     */
    create: XOR<rent_productsCreateInput, rent_productsUncheckedCreateInput>
    /**
     * In case the rent_products was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rent_productsUpdateInput, rent_productsUncheckedUpdateInput>
  }

  /**
   * rent_products delete
   */
  export type rent_productsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    /**
     * Filter which rent_products to delete.
     */
    where: rent_productsWhereUniqueInput
  }

  /**
   * rent_products deleteMany
   */
  export type rent_productsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rent_products to delete
     */
    where?: rent_productsWhereInput
    /**
     * Limit how many rent_products to delete.
     */
    limit?: number
  }

  /**
   * rent_products without action
   */
  export type rent_productsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
  }


  /**
   * Model rents
   */

  export type AggregateRents = {
    _count: RentsCountAggregateOutputType | null
    _avg: RentsAvgAggregateOutputType | null
    _sum: RentsSumAggregateOutputType | null
    _min: RentsMinAggregateOutputType | null
    _max: RentsMaxAggregateOutputType | null
  }

  export type RentsAvgAggregateOutputType = {
    total_value: Decimal | null
    discount_value: Decimal | null
    signal_value: Decimal | null
    remaining_value: Decimal | null
    code: Decimal | null
  }

  export type RentsSumAggregateOutputType = {
    total_value: Decimal | null
    discount_value: Decimal | null
    signal_value: Decimal | null
    remaining_value: Decimal | null
    code: Decimal | null
  }

  export type RentsMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    rent_date: Date | null
    return_date: Date | null
    client_name: string | null
    address: string | null
    phone: string | null
    total_value: Decimal | null
    discount_type: $Enums.discount_type_enum | null
    discount_value: Decimal | null
    signal_value: Decimal | null
    remaining_value: Decimal | null
    deleted: boolean | null
    deleted_at: Date | null
    updated_at: Date | null
    internal_observations: string | null
    receipt_observations: string | null
    code: Decimal | null
  }

  export type RentsMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    rent_date: Date | null
    return_date: Date | null
    client_name: string | null
    address: string | null
    phone: string | null
    total_value: Decimal | null
    discount_type: $Enums.discount_type_enum | null
    discount_value: Decimal | null
    signal_value: Decimal | null
    remaining_value: Decimal | null
    deleted: boolean | null
    deleted_at: Date | null
    updated_at: Date | null
    internal_observations: string | null
    receipt_observations: string | null
    code: Decimal | null
  }

  export type RentsCountAggregateOutputType = {
    id: number
    created_at: number
    rent_date: number
    return_date: number
    client_name: number
    address: number
    phone: number
    total_value: number
    discount_type: number
    discount_value: number
    signal_value: number
    remaining_value: number
    deleted: number
    deleted_at: number
    updated_at: number
    internal_observations: number
    receipt_observations: number
    code: number
    _all: number
  }


  export type RentsAvgAggregateInputType = {
    total_value?: true
    discount_value?: true
    signal_value?: true
    remaining_value?: true
    code?: true
  }

  export type RentsSumAggregateInputType = {
    total_value?: true
    discount_value?: true
    signal_value?: true
    remaining_value?: true
    code?: true
  }

  export type RentsMinAggregateInputType = {
    id?: true
    created_at?: true
    rent_date?: true
    return_date?: true
    client_name?: true
    address?: true
    phone?: true
    total_value?: true
    discount_type?: true
    discount_value?: true
    signal_value?: true
    remaining_value?: true
    deleted?: true
    deleted_at?: true
    updated_at?: true
    internal_observations?: true
    receipt_observations?: true
    code?: true
  }

  export type RentsMaxAggregateInputType = {
    id?: true
    created_at?: true
    rent_date?: true
    return_date?: true
    client_name?: true
    address?: true
    phone?: true
    total_value?: true
    discount_type?: true
    discount_value?: true
    signal_value?: true
    remaining_value?: true
    deleted?: true
    deleted_at?: true
    updated_at?: true
    internal_observations?: true
    receipt_observations?: true
    code?: true
  }

  export type RentsCountAggregateInputType = {
    id?: true
    created_at?: true
    rent_date?: true
    return_date?: true
    client_name?: true
    address?: true
    phone?: true
    total_value?: true
    discount_type?: true
    discount_value?: true
    signal_value?: true
    remaining_value?: true
    deleted?: true
    deleted_at?: true
    updated_at?: true
    internal_observations?: true
    receipt_observations?: true
    code?: true
    _all?: true
  }

  export type RentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rents to aggregate.
     */
    where?: rentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rents to fetch.
     */
    orderBy?: rentsOrderByWithRelationInput | rentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned rents
    **/
    _count?: true | RentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RentsMaxAggregateInputType
  }

  export type GetRentsAggregateType<T extends RentsAggregateArgs> = {
        [P in keyof T & keyof AggregateRents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRents[P]>
      : GetScalarType<T[P], AggregateRents[P]>
  }




  export type rentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rentsWhereInput
    orderBy?: rentsOrderByWithAggregationInput | rentsOrderByWithAggregationInput[]
    by: RentsScalarFieldEnum[] | RentsScalarFieldEnum
    having?: rentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RentsCountAggregateInputType | true
    _avg?: RentsAvgAggregateInputType
    _sum?: RentsSumAggregateInputType
    _min?: RentsMinAggregateInputType
    _max?: RentsMaxAggregateInputType
  }

  export type RentsGroupByOutputType = {
    id: string
    created_at: Date | null
    rent_date: Date
    return_date: Date | null
    client_name: string
    address: string | null
    phone: string | null
    total_value: Decimal
    discount_type: $Enums.discount_type_enum | null
    discount_value: Decimal | null
    signal_value: Decimal | null
    remaining_value: Decimal | null
    deleted: boolean | null
    deleted_at: Date | null
    updated_at: Date | null
    internal_observations: string | null
    receipt_observations: string | null
    code: Decimal
    _count: RentsCountAggregateOutputType | null
    _avg: RentsAvgAggregateOutputType | null
    _sum: RentsSumAggregateOutputType | null
    _min: RentsMinAggregateOutputType | null
    _max: RentsMaxAggregateOutputType | null
  }

  type GetRentsGroupByPayload<T extends rentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RentsGroupByOutputType[P]>
            : GetScalarType<T[P], RentsGroupByOutputType[P]>
        }
      >
    >


  export type rentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    rent_date?: boolean
    return_date?: boolean
    client_name?: boolean
    address?: boolean
    phone?: boolean
    total_value?: boolean
    discount_type?: boolean
    discount_value?: boolean
    signal_value?: boolean
    remaining_value?: boolean
    deleted?: boolean
    deleted_at?: boolean
    updated_at?: boolean
    internal_observations?: boolean
    receipt_observations?: boolean
    code?: boolean
    rent_products?: boolean | rents$rent_productsArgs<ExtArgs>
    _count?: boolean | RentsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rents"]>

  export type rentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    rent_date?: boolean
    return_date?: boolean
    client_name?: boolean
    address?: boolean
    phone?: boolean
    total_value?: boolean
    discount_type?: boolean
    discount_value?: boolean
    signal_value?: boolean
    remaining_value?: boolean
    deleted?: boolean
    deleted_at?: boolean
    updated_at?: boolean
    internal_observations?: boolean
    receipt_observations?: boolean
    code?: boolean
  }, ExtArgs["result"]["rents"]>

  export type rentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    rent_date?: boolean
    return_date?: boolean
    client_name?: boolean
    address?: boolean
    phone?: boolean
    total_value?: boolean
    discount_type?: boolean
    discount_value?: boolean
    signal_value?: boolean
    remaining_value?: boolean
    deleted?: boolean
    deleted_at?: boolean
    updated_at?: boolean
    internal_observations?: boolean
    receipt_observations?: boolean
    code?: boolean
  }, ExtArgs["result"]["rents"]>

  export type rentsSelectScalar = {
    id?: boolean
    created_at?: boolean
    rent_date?: boolean
    return_date?: boolean
    client_name?: boolean
    address?: boolean
    phone?: boolean
    total_value?: boolean
    discount_type?: boolean
    discount_value?: boolean
    signal_value?: boolean
    remaining_value?: boolean
    deleted?: boolean
    deleted_at?: boolean
    updated_at?: boolean
    internal_observations?: boolean
    receipt_observations?: boolean
    code?: boolean
  }

  export type rentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "rent_date" | "return_date" | "client_name" | "address" | "phone" | "total_value" | "discount_type" | "discount_value" | "signal_value" | "remaining_value" | "deleted" | "deleted_at" | "updated_at" | "internal_observations" | "receipt_observations" | "code", ExtArgs["result"]["rents"]>
  export type rentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rent_products?: boolean | rents$rent_productsArgs<ExtArgs>
    _count?: boolean | RentsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type rentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type rentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $rentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "rents"
    objects: {
      rent_products: Prisma.$rent_productsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date | null
      rent_date: Date
      return_date: Date | null
      client_name: string
      address: string | null
      phone: string | null
      total_value: Prisma.Decimal
      discount_type: $Enums.discount_type_enum | null
      discount_value: Prisma.Decimal | null
      signal_value: Prisma.Decimal | null
      remaining_value: Prisma.Decimal | null
      deleted: boolean | null
      deleted_at: Date | null
      updated_at: Date | null
      internal_observations: string | null
      receipt_observations: string | null
      code: Prisma.Decimal
    }, ExtArgs["result"]["rents"]>
    composites: {}
  }

  type rentsGetPayload<S extends boolean | null | undefined | rentsDefaultArgs> = $Result.GetResult<Prisma.$rentsPayload, S>

  type rentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<rentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RentsCountAggregateInputType | true
    }

  export interface rentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['rents'], meta: { name: 'rents' } }
    /**
     * Find zero or one Rents that matches the filter.
     * @param {rentsFindUniqueArgs} args - Arguments to find a Rents
     * @example
     * // Get one Rents
     * const rents = await prisma.rents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rentsFindUniqueArgs>(args: SelectSubset<T, rentsFindUniqueArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {rentsFindUniqueOrThrowArgs} args - Arguments to find a Rents
     * @example
     * // Get one Rents
     * const rents = await prisma.rents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rentsFindUniqueOrThrowArgs>(args: SelectSubset<T, rentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentsFindFirstArgs} args - Arguments to find a Rents
     * @example
     * // Get one Rents
     * const rents = await prisma.rents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rentsFindFirstArgs>(args?: SelectSubset<T, rentsFindFirstArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentsFindFirstOrThrowArgs} args - Arguments to find a Rents
     * @example
     * // Get one Rents
     * const rents = await prisma.rents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rentsFindFirstOrThrowArgs>(args?: SelectSubset<T, rentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rents
     * const rents = await prisma.rents.findMany()
     * 
     * // Get first 10 Rents
     * const rents = await prisma.rents.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rentsWithIdOnly = await prisma.rents.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends rentsFindManyArgs>(args?: SelectSubset<T, rentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rents.
     * @param {rentsCreateArgs} args - Arguments to create a Rents.
     * @example
     * // Create one Rents
     * const Rents = await prisma.rents.create({
     *   data: {
     *     // ... data to create a Rents
     *   }
     * })
     * 
     */
    create<T extends rentsCreateArgs>(args: SelectSubset<T, rentsCreateArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rents.
     * @param {rentsCreateManyArgs} args - Arguments to create many Rents.
     * @example
     * // Create many Rents
     * const rents = await prisma.rents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rentsCreateManyArgs>(args?: SelectSubset<T, rentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rents and returns the data saved in the database.
     * @param {rentsCreateManyAndReturnArgs} args - Arguments to create many Rents.
     * @example
     * // Create many Rents
     * const rents = await prisma.rents.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rents and only return the `id`
     * const rentsWithIdOnly = await prisma.rents.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rentsCreateManyAndReturnArgs>(args?: SelectSubset<T, rentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rents.
     * @param {rentsDeleteArgs} args - Arguments to delete one Rents.
     * @example
     * // Delete one Rents
     * const Rents = await prisma.rents.delete({
     *   where: {
     *     // ... filter to delete one Rents
     *   }
     * })
     * 
     */
    delete<T extends rentsDeleteArgs>(args: SelectSubset<T, rentsDeleteArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rents.
     * @param {rentsUpdateArgs} args - Arguments to update one Rents.
     * @example
     * // Update one Rents
     * const rents = await prisma.rents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rentsUpdateArgs>(args: SelectSubset<T, rentsUpdateArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rents.
     * @param {rentsDeleteManyArgs} args - Arguments to filter Rents to delete.
     * @example
     * // Delete a few Rents
     * const { count } = await prisma.rents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rentsDeleteManyArgs>(args?: SelectSubset<T, rentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rents
     * const rents = await prisma.rents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rentsUpdateManyArgs>(args: SelectSubset<T, rentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rents and returns the data updated in the database.
     * @param {rentsUpdateManyAndReturnArgs} args - Arguments to update many Rents.
     * @example
     * // Update many Rents
     * const rents = await prisma.rents.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rents and only return the `id`
     * const rentsWithIdOnly = await prisma.rents.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends rentsUpdateManyAndReturnArgs>(args: SelectSubset<T, rentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rents.
     * @param {rentsUpsertArgs} args - Arguments to update or create a Rents.
     * @example
     * // Update or create a Rents
     * const rents = await prisma.rents.upsert({
     *   create: {
     *     // ... data to create a Rents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rents we want to update
     *   }
     * })
     */
    upsert<T extends rentsUpsertArgs>(args: SelectSubset<T, rentsUpsertArgs<ExtArgs>>): Prisma__rentsClient<$Result.GetResult<Prisma.$rentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentsCountArgs} args - Arguments to filter Rents to count.
     * @example
     * // Count the number of Rents
     * const count = await prisma.rents.count({
     *   where: {
     *     // ... the filter for the Rents we want to count
     *   }
     * })
    **/
    count<T extends rentsCountArgs>(
      args?: Subset<T, rentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RentsAggregateArgs>(args: Subset<T, RentsAggregateArgs>): Prisma.PrismaPromise<GetRentsAggregateType<T>>

    /**
     * Group by Rents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rentsGroupByArgs['orderBy'] }
        : { orderBy?: rentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the rents model
   */
  readonly fields: rentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for rents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rent_products<T extends rents$rent_productsArgs<ExtArgs> = {}>(args?: Subset<T, rents$rent_productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rent_productsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the rents model
   */
  interface rentsFieldRefs {
    readonly id: FieldRef<"rents", 'String'>
    readonly created_at: FieldRef<"rents", 'DateTime'>
    readonly rent_date: FieldRef<"rents", 'DateTime'>
    readonly return_date: FieldRef<"rents", 'DateTime'>
    readonly client_name: FieldRef<"rents", 'String'>
    readonly address: FieldRef<"rents", 'String'>
    readonly phone: FieldRef<"rents", 'String'>
    readonly total_value: FieldRef<"rents", 'Decimal'>
    readonly discount_type: FieldRef<"rents", 'discount_type_enum'>
    readonly discount_value: FieldRef<"rents", 'Decimal'>
    readonly signal_value: FieldRef<"rents", 'Decimal'>
    readonly remaining_value: FieldRef<"rents", 'Decimal'>
    readonly deleted: FieldRef<"rents", 'Boolean'>
    readonly deleted_at: FieldRef<"rents", 'DateTime'>
    readonly updated_at: FieldRef<"rents", 'DateTime'>
    readonly internal_observations: FieldRef<"rents", 'String'>
    readonly receipt_observations: FieldRef<"rents", 'String'>
    readonly code: FieldRef<"rents", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * rents findUnique
   */
  export type rentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * Filter, which rents to fetch.
     */
    where: rentsWhereUniqueInput
  }

  /**
   * rents findUniqueOrThrow
   */
  export type rentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * Filter, which rents to fetch.
     */
    where: rentsWhereUniqueInput
  }

  /**
   * rents findFirst
   */
  export type rentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * Filter, which rents to fetch.
     */
    where?: rentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rents to fetch.
     */
    orderBy?: rentsOrderByWithRelationInput | rentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rents.
     */
    cursor?: rentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rents.
     */
    distinct?: RentsScalarFieldEnum | RentsScalarFieldEnum[]
  }

  /**
   * rents findFirstOrThrow
   */
  export type rentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * Filter, which rents to fetch.
     */
    where?: rentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rents to fetch.
     */
    orderBy?: rentsOrderByWithRelationInput | rentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rents.
     */
    cursor?: rentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rents.
     */
    distinct?: RentsScalarFieldEnum | RentsScalarFieldEnum[]
  }

  /**
   * rents findMany
   */
  export type rentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * Filter, which rents to fetch.
     */
    where?: rentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rents to fetch.
     */
    orderBy?: rentsOrderByWithRelationInput | rentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing rents.
     */
    cursor?: rentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rents.
     */
    skip?: number
    distinct?: RentsScalarFieldEnum | RentsScalarFieldEnum[]
  }

  /**
   * rents create
   */
  export type rentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * The data needed to create a rents.
     */
    data: XOR<rentsCreateInput, rentsUncheckedCreateInput>
  }

  /**
   * rents createMany
   */
  export type rentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many rents.
     */
    data: rentsCreateManyInput | rentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rents createManyAndReturn
   */
  export type rentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * The data used to create many rents.
     */
    data: rentsCreateManyInput | rentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rents update
   */
  export type rentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * The data needed to update a rents.
     */
    data: XOR<rentsUpdateInput, rentsUncheckedUpdateInput>
    /**
     * Choose, which rents to update.
     */
    where: rentsWhereUniqueInput
  }

  /**
   * rents updateMany
   */
  export type rentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update rents.
     */
    data: XOR<rentsUpdateManyMutationInput, rentsUncheckedUpdateManyInput>
    /**
     * Filter which rents to update
     */
    where?: rentsWhereInput
    /**
     * Limit how many rents to update.
     */
    limit?: number
  }

  /**
   * rents updateManyAndReturn
   */
  export type rentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * The data used to update rents.
     */
    data: XOR<rentsUpdateManyMutationInput, rentsUncheckedUpdateManyInput>
    /**
     * Filter which rents to update
     */
    where?: rentsWhereInput
    /**
     * Limit how many rents to update.
     */
    limit?: number
  }

  /**
   * rents upsert
   */
  export type rentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * The filter to search for the rents to update in case it exists.
     */
    where: rentsWhereUniqueInput
    /**
     * In case the rents found by the `where` argument doesn't exist, create a new rents with this data.
     */
    create: XOR<rentsCreateInput, rentsUncheckedCreateInput>
    /**
     * In case the rents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rentsUpdateInput, rentsUncheckedUpdateInput>
  }

  /**
   * rents delete
   */
  export type rentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
    /**
     * Filter which rents to delete.
     */
    where: rentsWhereUniqueInput
  }

  /**
   * rents deleteMany
   */
  export type rentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rents to delete
     */
    where?: rentsWhereInput
    /**
     * Limit how many rents to delete.
     */
    limit?: number
  }

  /**
   * rents.rent_products
   */
  export type rents$rent_productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rent_products
     */
    select?: rent_productsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rent_products
     */
    omit?: rent_productsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rent_productsInclude<ExtArgs> | null
    where?: rent_productsWhereInput
    orderBy?: rent_productsOrderByWithRelationInput | rent_productsOrderByWithRelationInput[]
    cursor?: rent_productsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Rent_productsScalarFieldEnum | Rent_productsScalarFieldEnum[]
  }

  /**
   * rents without action
   */
  export type rentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rents
     */
    select?: rentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rents
     */
    omit?: rentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rentsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CategoriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted: 'deleted',
    deleted_at: 'deleted_at',
    post_return_buffer_days: 'post_return_buffer_days',
    measure_type: 'measure_type'
  };

  export type CategoriesScalarFieldEnum = (typeof CategoriesScalarFieldEnum)[keyof typeof CategoriesScalarFieldEnum]


  export const ProductsScalarFieldEnum: {
    id: 'id',
    reference: 'reference',
    description: 'description',
    receipt_description: 'receipt_description',
    category_id: 'category_id',
    price: 'price',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted: 'deleted',
    deleted_at: 'deleted_at'
  };

  export type ProductsScalarFieldEnum = (typeof ProductsScalarFieldEnum)[keyof typeof ProductsScalarFieldEnum]


  export const Rent_productsScalarFieldEnum: {
    id: 'id',
    rent_id: 'rent_id',
    product_id: 'product_id',
    product_price: 'product_price',
    product_description: 'product_description',
    created_at: 'created_at',
    actual_return_buffer_days: 'actual_return_buffer_days',
    actual_return_date: 'actual_return_date',
    bust: 'bust',
    waist: 'waist',
    hip: 'hip',
    shoulder: 'shoulder',
    sleeve: 'sleeve',
    height: 'height',
    back: 'back',
    measure_type: 'measure_type'
  };

  export type Rent_productsScalarFieldEnum = (typeof Rent_productsScalarFieldEnum)[keyof typeof Rent_productsScalarFieldEnum]


  export const RentsScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    rent_date: 'rent_date',
    return_date: 'return_date',
    client_name: 'client_name',
    address: 'address',
    phone: 'phone',
    total_value: 'total_value',
    discount_type: 'discount_type',
    discount_value: 'discount_value',
    signal_value: 'signal_value',
    remaining_value: 'remaining_value',
    deleted: 'deleted',
    deleted_at: 'deleted_at',
    updated_at: 'updated_at',
    internal_observations: 'internal_observations',
    receipt_observations: 'receipt_observations',
    code: 'code'
  };

  export type RentsScalarFieldEnum = (typeof RentsScalarFieldEnum)[keyof typeof RentsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'measures_type'
   */
  export type Enummeasures_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'measures_type'>
    


  /**
   * Reference to a field of type 'measures_type[]'
   */
  export type ListEnummeasures_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'measures_type[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'discount_type_enum'
   */
  export type Enumdiscount_type_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'discount_type_enum'>
    


  /**
   * Reference to a field of type 'discount_type_enum[]'
   */
  export type ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'discount_type_enum[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type categoriesWhereInput = {
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    id?: UuidFilter<"categories"> | string
    name?: StringFilter<"categories"> | string
    created_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    deleted?: BoolNullableFilter<"categories"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    post_return_buffer_days?: IntNullableFilter<"categories"> | number | null
    measure_type?: Enummeasures_typeNullableFilter<"categories"> | $Enums.measures_type | null
    products?: ProductsListRelationFilter
  }

  export type categoriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    post_return_buffer_days?: SortOrderInput | SortOrder
    measure_type?: SortOrderInput | SortOrder
    products?: productsOrderByRelationAggregateInput
  }

  export type categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: categoriesWhereInput | categoriesWhereInput[]
    OR?: categoriesWhereInput[]
    NOT?: categoriesWhereInput | categoriesWhereInput[]
    name?: StringFilter<"categories"> | string
    created_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    deleted?: BoolNullableFilter<"categories"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"categories"> | Date | string | null
    post_return_buffer_days?: IntNullableFilter<"categories"> | number | null
    measure_type?: Enummeasures_typeNullableFilter<"categories"> | $Enums.measures_type | null
    products?: ProductsListRelationFilter
  }, "id">

  export type categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    post_return_buffer_days?: SortOrderInput | SortOrder
    measure_type?: SortOrderInput | SortOrder
    _count?: categoriesCountOrderByAggregateInput
    _avg?: categoriesAvgOrderByAggregateInput
    _max?: categoriesMaxOrderByAggregateInput
    _min?: categoriesMinOrderByAggregateInput
    _sum?: categoriesSumOrderByAggregateInput
  }

  export type categoriesScalarWhereWithAggregatesInput = {
    AND?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    OR?: categoriesScalarWhereWithAggregatesInput[]
    NOT?: categoriesScalarWhereWithAggregatesInput | categoriesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"categories"> | string
    name?: StringWithAggregatesFilter<"categories"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null
    deleted?: BoolNullableWithAggregatesFilter<"categories"> | boolean | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"categories"> | Date | string | null
    post_return_buffer_days?: IntNullableWithAggregatesFilter<"categories"> | number | null
    measure_type?: Enummeasures_typeNullableWithAggregatesFilter<"categories"> | $Enums.measures_type | null
  }

  export type productsWhereInput = {
    AND?: productsWhereInput | productsWhereInput[]
    OR?: productsWhereInput[]
    NOT?: productsWhereInput | productsWhereInput[]
    id?: UuidFilter<"products"> | string
    reference?: StringFilter<"products"> | string
    description?: StringNullableFilter<"products"> | string | null
    receipt_description?: StringNullableFilter<"products"> | string | null
    category_id?: UuidNullableFilter<"products"> | string | null
    price?: DecimalFilter<"products"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"products"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"products"> | Date | string | null
    deleted?: BoolNullableFilter<"products"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"products"> | Date | string | null
    categories?: XOR<CategoriesNullableScalarRelationFilter, categoriesWhereInput> | null
    rent_products?: Rent_productsListRelationFilter
  }

  export type productsOrderByWithRelationInput = {
    id?: SortOrder
    reference?: SortOrder
    description?: SortOrderInput | SortOrder
    receipt_description?: SortOrderInput | SortOrder
    category_id?: SortOrderInput | SortOrder
    price?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    categories?: categoriesOrderByWithRelationInput
    rent_products?: rent_productsOrderByRelationAggregateInput
  }

  export type productsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: productsWhereInput | productsWhereInput[]
    OR?: productsWhereInput[]
    NOT?: productsWhereInput | productsWhereInput[]
    reference?: StringFilter<"products"> | string
    description?: StringNullableFilter<"products"> | string | null
    receipt_description?: StringNullableFilter<"products"> | string | null
    category_id?: UuidNullableFilter<"products"> | string | null
    price?: DecimalFilter<"products"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"products"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"products"> | Date | string | null
    deleted?: BoolNullableFilter<"products"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"products"> | Date | string | null
    categories?: XOR<CategoriesNullableScalarRelationFilter, categoriesWhereInput> | null
    rent_products?: Rent_productsListRelationFilter
  }, "id">

  export type productsOrderByWithAggregationInput = {
    id?: SortOrder
    reference?: SortOrder
    description?: SortOrderInput | SortOrder
    receipt_description?: SortOrderInput | SortOrder
    category_id?: SortOrderInput | SortOrder
    price?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    _count?: productsCountOrderByAggregateInput
    _avg?: productsAvgOrderByAggregateInput
    _max?: productsMaxOrderByAggregateInput
    _min?: productsMinOrderByAggregateInput
    _sum?: productsSumOrderByAggregateInput
  }

  export type productsScalarWhereWithAggregatesInput = {
    AND?: productsScalarWhereWithAggregatesInput | productsScalarWhereWithAggregatesInput[]
    OR?: productsScalarWhereWithAggregatesInput[]
    NOT?: productsScalarWhereWithAggregatesInput | productsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"products"> | string
    reference?: StringWithAggregatesFilter<"products"> | string
    description?: StringNullableWithAggregatesFilter<"products"> | string | null
    receipt_description?: StringNullableWithAggregatesFilter<"products"> | string | null
    category_id?: UuidNullableWithAggregatesFilter<"products"> | string | null
    price?: DecimalWithAggregatesFilter<"products"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableWithAggregatesFilter<"products"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"products"> | Date | string | null
    deleted?: BoolNullableWithAggregatesFilter<"products"> | boolean | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"products"> | Date | string | null
  }

  export type rent_productsWhereInput = {
    AND?: rent_productsWhereInput | rent_productsWhereInput[]
    OR?: rent_productsWhereInput[]
    NOT?: rent_productsWhereInput | rent_productsWhereInput[]
    id?: UuidFilter<"rent_products"> | string
    rent_id?: UuidFilter<"rent_products"> | string
    product_id?: UuidFilter<"rent_products"> | string
    product_price?: DecimalFilter<"rent_products"> | Decimal | DecimalJsLike | number | string
    product_description?: StringFilter<"rent_products"> | string
    created_at?: DateTimeNullableFilter<"rent_products"> | Date | string | null
    actual_return_buffer_days?: IntNullableFilter<"rent_products"> | number | null
    actual_return_date?: DateTimeNullableFilter<"rent_products"> | Date | string | null
    bust?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    waist?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    hip?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    shoulder?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    sleeve?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    height?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    back?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFilter<"rent_products"> | $Enums.measures_type
    products?: XOR<ProductsScalarRelationFilter, productsWhereInput>
    rents?: XOR<RentsScalarRelationFilter, rentsWhereInput>
  }

  export type rent_productsOrderByWithRelationInput = {
    id?: SortOrder
    rent_id?: SortOrder
    product_id?: SortOrder
    product_price?: SortOrder
    product_description?: SortOrder
    created_at?: SortOrderInput | SortOrder
    actual_return_buffer_days?: SortOrderInput | SortOrder
    actual_return_date?: SortOrderInput | SortOrder
    bust?: SortOrderInput | SortOrder
    waist?: SortOrderInput | SortOrder
    hip?: SortOrderInput | SortOrder
    shoulder?: SortOrderInput | SortOrder
    sleeve?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    back?: SortOrderInput | SortOrder
    measure_type?: SortOrder
    products?: productsOrderByWithRelationInput
    rents?: rentsOrderByWithRelationInput
  }

  export type rent_productsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    rent_id_product_id?: rent_productsRent_idProduct_idCompoundUniqueInput
    AND?: rent_productsWhereInput | rent_productsWhereInput[]
    OR?: rent_productsWhereInput[]
    NOT?: rent_productsWhereInput | rent_productsWhereInput[]
    rent_id?: UuidFilter<"rent_products"> | string
    product_id?: UuidFilter<"rent_products"> | string
    product_price?: DecimalFilter<"rent_products"> | Decimal | DecimalJsLike | number | string
    product_description?: StringFilter<"rent_products"> | string
    created_at?: DateTimeNullableFilter<"rent_products"> | Date | string | null
    actual_return_buffer_days?: IntNullableFilter<"rent_products"> | number | null
    actual_return_date?: DateTimeNullableFilter<"rent_products"> | Date | string | null
    bust?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    waist?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    hip?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    shoulder?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    sleeve?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    height?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    back?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFilter<"rent_products"> | $Enums.measures_type
    products?: XOR<ProductsScalarRelationFilter, productsWhereInput>
    rents?: XOR<RentsScalarRelationFilter, rentsWhereInput>
  }, "id" | "rent_id_product_id">

  export type rent_productsOrderByWithAggregationInput = {
    id?: SortOrder
    rent_id?: SortOrder
    product_id?: SortOrder
    product_price?: SortOrder
    product_description?: SortOrder
    created_at?: SortOrderInput | SortOrder
    actual_return_buffer_days?: SortOrderInput | SortOrder
    actual_return_date?: SortOrderInput | SortOrder
    bust?: SortOrderInput | SortOrder
    waist?: SortOrderInput | SortOrder
    hip?: SortOrderInput | SortOrder
    shoulder?: SortOrderInput | SortOrder
    sleeve?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    back?: SortOrderInput | SortOrder
    measure_type?: SortOrder
    _count?: rent_productsCountOrderByAggregateInput
    _avg?: rent_productsAvgOrderByAggregateInput
    _max?: rent_productsMaxOrderByAggregateInput
    _min?: rent_productsMinOrderByAggregateInput
    _sum?: rent_productsSumOrderByAggregateInput
  }

  export type rent_productsScalarWhereWithAggregatesInput = {
    AND?: rent_productsScalarWhereWithAggregatesInput | rent_productsScalarWhereWithAggregatesInput[]
    OR?: rent_productsScalarWhereWithAggregatesInput[]
    NOT?: rent_productsScalarWhereWithAggregatesInput | rent_productsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"rent_products"> | string
    rent_id?: UuidWithAggregatesFilter<"rent_products"> | string
    product_id?: UuidWithAggregatesFilter<"rent_products"> | string
    product_price?: DecimalWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string
    product_description?: StringWithAggregatesFilter<"rent_products"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"rent_products"> | Date | string | null
    actual_return_buffer_days?: IntNullableWithAggregatesFilter<"rent_products"> | number | null
    actual_return_date?: DateTimeNullableWithAggregatesFilter<"rent_products"> | Date | string | null
    bust?: DecimalNullableWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    waist?: DecimalNullableWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    hip?: DecimalNullableWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    shoulder?: DecimalNullableWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    sleeve?: DecimalNullableWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    height?: DecimalNullableWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    back?: DecimalNullableWithAggregatesFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeWithAggregatesFilter<"rent_products"> | $Enums.measures_type
  }

  export type rentsWhereInput = {
    AND?: rentsWhereInput | rentsWhereInput[]
    OR?: rentsWhereInput[]
    NOT?: rentsWhereInput | rentsWhereInput[]
    id?: UuidFilter<"rents"> | string
    created_at?: DateTimeNullableFilter<"rents"> | Date | string | null
    rent_date?: DateTimeFilter<"rents"> | Date | string
    return_date?: DateTimeNullableFilter<"rents"> | Date | string | null
    client_name?: StringFilter<"rents"> | string
    address?: StringNullableFilter<"rents"> | string | null
    phone?: StringNullableFilter<"rents"> | string | null
    total_value?: DecimalFilter<"rents"> | Decimal | DecimalJsLike | number | string
    discount_type?: Enumdiscount_type_enumNullableFilter<"rents"> | $Enums.discount_type_enum | null
    discount_value?: DecimalNullableFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    signal_value?: DecimalNullableFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    remaining_value?: DecimalNullableFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    deleted?: BoolNullableFilter<"rents"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"rents"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"rents"> | Date | string | null
    internal_observations?: StringNullableFilter<"rents"> | string | null
    receipt_observations?: StringNullableFilter<"rents"> | string | null
    code?: DecimalFilter<"rents"> | Decimal | DecimalJsLike | number | string
    rent_products?: Rent_productsListRelationFilter
  }

  export type rentsOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    rent_date?: SortOrder
    return_date?: SortOrderInput | SortOrder
    client_name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    total_value?: SortOrder
    discount_type?: SortOrderInput | SortOrder
    discount_value?: SortOrderInput | SortOrder
    signal_value?: SortOrderInput | SortOrder
    remaining_value?: SortOrderInput | SortOrder
    deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    internal_observations?: SortOrderInput | SortOrder
    receipt_observations?: SortOrderInput | SortOrder
    code?: SortOrder
    rent_products?: rent_productsOrderByRelationAggregateInput
  }

  export type rentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: rentsWhereInput | rentsWhereInput[]
    OR?: rentsWhereInput[]
    NOT?: rentsWhereInput | rentsWhereInput[]
    created_at?: DateTimeNullableFilter<"rents"> | Date | string | null
    rent_date?: DateTimeFilter<"rents"> | Date | string
    return_date?: DateTimeNullableFilter<"rents"> | Date | string | null
    client_name?: StringFilter<"rents"> | string
    address?: StringNullableFilter<"rents"> | string | null
    phone?: StringNullableFilter<"rents"> | string | null
    total_value?: DecimalFilter<"rents"> | Decimal | DecimalJsLike | number | string
    discount_type?: Enumdiscount_type_enumNullableFilter<"rents"> | $Enums.discount_type_enum | null
    discount_value?: DecimalNullableFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    signal_value?: DecimalNullableFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    remaining_value?: DecimalNullableFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    deleted?: BoolNullableFilter<"rents"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"rents"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"rents"> | Date | string | null
    internal_observations?: StringNullableFilter<"rents"> | string | null
    receipt_observations?: StringNullableFilter<"rents"> | string | null
    code?: DecimalFilter<"rents"> | Decimal | DecimalJsLike | number | string
    rent_products?: Rent_productsListRelationFilter
  }, "id">

  export type rentsOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    rent_date?: SortOrder
    return_date?: SortOrderInput | SortOrder
    client_name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    total_value?: SortOrder
    discount_type?: SortOrderInput | SortOrder
    discount_value?: SortOrderInput | SortOrder
    signal_value?: SortOrderInput | SortOrder
    remaining_value?: SortOrderInput | SortOrder
    deleted?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    internal_observations?: SortOrderInput | SortOrder
    receipt_observations?: SortOrderInput | SortOrder
    code?: SortOrder
    _count?: rentsCountOrderByAggregateInput
    _avg?: rentsAvgOrderByAggregateInput
    _max?: rentsMaxOrderByAggregateInput
    _min?: rentsMinOrderByAggregateInput
    _sum?: rentsSumOrderByAggregateInput
  }

  export type rentsScalarWhereWithAggregatesInput = {
    AND?: rentsScalarWhereWithAggregatesInput | rentsScalarWhereWithAggregatesInput[]
    OR?: rentsScalarWhereWithAggregatesInput[]
    NOT?: rentsScalarWhereWithAggregatesInput | rentsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"rents"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"rents"> | Date | string | null
    rent_date?: DateTimeWithAggregatesFilter<"rents"> | Date | string
    return_date?: DateTimeNullableWithAggregatesFilter<"rents"> | Date | string | null
    client_name?: StringWithAggregatesFilter<"rents"> | string
    address?: StringNullableWithAggregatesFilter<"rents"> | string | null
    phone?: StringNullableWithAggregatesFilter<"rents"> | string | null
    total_value?: DecimalWithAggregatesFilter<"rents"> | Decimal | DecimalJsLike | number | string
    discount_type?: Enumdiscount_type_enumNullableWithAggregatesFilter<"rents"> | $Enums.discount_type_enum | null
    discount_value?: DecimalNullableWithAggregatesFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    signal_value?: DecimalNullableWithAggregatesFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    remaining_value?: DecimalNullableWithAggregatesFilter<"rents"> | Decimal | DecimalJsLike | number | string | null
    deleted?: BoolNullableWithAggregatesFilter<"rents"> | boolean | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"rents"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"rents"> | Date | string | null
    internal_observations?: StringNullableWithAggregatesFilter<"rents"> | string | null
    receipt_observations?: StringNullableWithAggregatesFilter<"rents"> | string | null
    code?: DecimalWithAggregatesFilter<"rents"> | Decimal | DecimalJsLike | number | string
  }

  export type categoriesCreateInput = {
    id?: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    post_return_buffer_days?: number | null
    measure_type?: $Enums.measures_type | null
    products?: productsCreateNestedManyWithoutCategoriesInput
  }

  export type categoriesUncheckedCreateInput = {
    id?: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    post_return_buffer_days?: number | null
    measure_type?: $Enums.measures_type | null
    products?: productsUncheckedCreateNestedManyWithoutCategoriesInput
  }

  export type categoriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    measure_type?: NullableEnummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type | null
    products?: productsUpdateManyWithoutCategoriesNestedInput
  }

  export type categoriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    measure_type?: NullableEnummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type | null
    products?: productsUncheckedUpdateManyWithoutCategoriesNestedInput
  }

  export type categoriesCreateManyInput = {
    id?: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    post_return_buffer_days?: number | null
    measure_type?: $Enums.measures_type | null
  }

  export type categoriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    measure_type?: NullableEnummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type | null
  }

  export type categoriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    measure_type?: NullableEnummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type | null
  }

  export type productsCreateInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    categories?: categoriesCreateNestedOneWithoutProductsInput
    rent_products?: rent_productsCreateNestedManyWithoutProductsInput
  }

  export type productsUncheckedCreateInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    category_id?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    rent_products?: rent_productsUncheckedCreateNestedManyWithoutProductsInput
  }

  export type productsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: categoriesUpdateOneWithoutProductsNestedInput
    rent_products?: rent_productsUpdateManyWithoutProductsNestedInput
  }

  export type productsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    category_id?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_products?: rent_productsUncheckedUpdateManyWithoutProductsNestedInput
  }

  export type productsCreateManyInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    category_id?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
  }

  export type productsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type productsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    category_id?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rent_productsCreateInput = {
    id?: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
    products: productsCreateNestedOneWithoutRent_productsInput
    rents: rentsCreateNestedOneWithoutRent_productsInput
  }

  export type rent_productsUncheckedCreateInput = {
    id?: string
    rent_id: string
    product_id: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
  }

  export type rent_productsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
    products?: productsUpdateOneRequiredWithoutRent_productsNestedInput
    rents?: rentsUpdateOneRequiredWithoutRent_productsNestedInput
  }

  export type rent_productsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rent_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
  }

  export type rent_productsCreateManyInput = {
    id?: string
    rent_id: string
    product_id: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
  }

  export type rent_productsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
  }

  export type rent_productsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rent_id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
  }

  export type rentsCreateInput = {
    id?: string
    created_at?: Date | string | null
    rent_date: Date | string
    return_date?: Date | string | null
    client_name: string
    address?: string | null
    phone?: string | null
    total_value: Decimal | DecimalJsLike | number | string
    discount_type?: $Enums.discount_type_enum | null
    discount_value?: Decimal | DecimalJsLike | number | string | null
    signal_value?: Decimal | DecimalJsLike | number | string | null
    remaining_value?: Decimal | DecimalJsLike | number | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    updated_at?: Date | string | null
    internal_observations?: string | null
    receipt_observations?: string | null
    code?: Decimal | DecimalJsLike | number | string
    rent_products?: rent_productsCreateNestedManyWithoutRentsInput
  }

  export type rentsUncheckedCreateInput = {
    id?: string
    created_at?: Date | string | null
    rent_date: Date | string
    return_date?: Date | string | null
    client_name: string
    address?: string | null
    phone?: string | null
    total_value: Decimal | DecimalJsLike | number | string
    discount_type?: $Enums.discount_type_enum | null
    discount_value?: Decimal | DecimalJsLike | number | string | null
    signal_value?: Decimal | DecimalJsLike | number | string | null
    remaining_value?: Decimal | DecimalJsLike | number | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    updated_at?: Date | string | null
    internal_observations?: string | null
    receipt_observations?: string | null
    code?: Decimal | DecimalJsLike | number | string
    rent_products?: rent_productsUncheckedCreateNestedManyWithoutRentsInput
  }

  export type rentsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    total_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount_type?: NullableEnumdiscount_type_enumFieldUpdateOperationsInput | $Enums.discount_type_enum | null
    discount_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    signal_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remaining_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internal_observations?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_observations?: NullableStringFieldUpdateOperationsInput | string | null
    code?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rent_products?: rent_productsUpdateManyWithoutRentsNestedInput
  }

  export type rentsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    total_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount_type?: NullableEnumdiscount_type_enumFieldUpdateOperationsInput | $Enums.discount_type_enum | null
    discount_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    signal_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remaining_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internal_observations?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_observations?: NullableStringFieldUpdateOperationsInput | string | null
    code?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    rent_products?: rent_productsUncheckedUpdateManyWithoutRentsNestedInput
  }

  export type rentsCreateManyInput = {
    id?: string
    created_at?: Date | string | null
    rent_date: Date | string
    return_date?: Date | string | null
    client_name: string
    address?: string | null
    phone?: string | null
    total_value: Decimal | DecimalJsLike | number | string
    discount_type?: $Enums.discount_type_enum | null
    discount_value?: Decimal | DecimalJsLike | number | string | null
    signal_value?: Decimal | DecimalJsLike | number | string | null
    remaining_value?: Decimal | DecimalJsLike | number | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    updated_at?: Date | string | null
    internal_observations?: string | null
    receipt_observations?: string | null
    code?: Decimal | DecimalJsLike | number | string
  }

  export type rentsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    total_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount_type?: NullableEnumdiscount_type_enumFieldUpdateOperationsInput | $Enums.discount_type_enum | null
    discount_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    signal_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remaining_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internal_observations?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_observations?: NullableStringFieldUpdateOperationsInput | string | null
    code?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type rentsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    total_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount_type?: NullableEnumdiscount_type_enumFieldUpdateOperationsInput | $Enums.discount_type_enum | null
    discount_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    signal_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remaining_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internal_observations?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_observations?: NullableStringFieldUpdateOperationsInput | string | null
    code?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Enummeasures_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnummeasures_typeNullableFilter<$PrismaModel> | $Enums.measures_type | null
  }

  export type ProductsListRelationFilter = {
    every?: productsWhereInput
    some?: productsWhereInput
    none?: productsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type productsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
    post_return_buffer_days?: SortOrder
    measure_type?: SortOrder
  }

  export type categoriesAvgOrderByAggregateInput = {
    post_return_buffer_days?: SortOrder
  }

  export type categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
    post_return_buffer_days?: SortOrder
    measure_type?: SortOrder
  }

  export type categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
    post_return_buffer_days?: SortOrder
    measure_type?: SortOrder
  }

  export type categoriesSumOrderByAggregateInput = {
    post_return_buffer_days?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type Enummeasures_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnummeasures_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.measures_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnummeasures_typeNullableFilter<$PrismaModel>
    _max?: NestedEnummeasures_typeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoriesNullableScalarRelationFilter = {
    is?: categoriesWhereInput | null
    isNot?: categoriesWhereInput | null
  }

  export type Rent_productsListRelationFilter = {
    every?: rent_productsWhereInput
    some?: rent_productsWhereInput
    none?: rent_productsWhereInput
  }

  export type rent_productsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type productsCountOrderByAggregateInput = {
    id?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    receipt_description?: SortOrder
    category_id?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
  }

  export type productsAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type productsMaxOrderByAggregateInput = {
    id?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    receipt_description?: SortOrder
    category_id?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
  }

  export type productsMinOrderByAggregateInput = {
    id?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    receipt_description?: SortOrder
    category_id?: SortOrder
    price?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
  }

  export type productsSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type Enummeasures_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel>
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummeasures_typeFilter<$PrismaModel> | $Enums.measures_type
  }

  export type ProductsScalarRelationFilter = {
    is?: productsWhereInput
    isNot?: productsWhereInput
  }

  export type RentsScalarRelationFilter = {
    is?: rentsWhereInput
    isNot?: rentsWhereInput
  }

  export type rent_productsRent_idProduct_idCompoundUniqueInput = {
    rent_id: string
    product_id: string
  }

  export type rent_productsCountOrderByAggregateInput = {
    id?: SortOrder
    rent_id?: SortOrder
    product_id?: SortOrder
    product_price?: SortOrder
    product_description?: SortOrder
    created_at?: SortOrder
    actual_return_buffer_days?: SortOrder
    actual_return_date?: SortOrder
    bust?: SortOrder
    waist?: SortOrder
    hip?: SortOrder
    shoulder?: SortOrder
    sleeve?: SortOrder
    height?: SortOrder
    back?: SortOrder
    measure_type?: SortOrder
  }

  export type rent_productsAvgOrderByAggregateInput = {
    product_price?: SortOrder
    actual_return_buffer_days?: SortOrder
    bust?: SortOrder
    waist?: SortOrder
    hip?: SortOrder
    shoulder?: SortOrder
    sleeve?: SortOrder
    height?: SortOrder
    back?: SortOrder
  }

  export type rent_productsMaxOrderByAggregateInput = {
    id?: SortOrder
    rent_id?: SortOrder
    product_id?: SortOrder
    product_price?: SortOrder
    product_description?: SortOrder
    created_at?: SortOrder
    actual_return_buffer_days?: SortOrder
    actual_return_date?: SortOrder
    bust?: SortOrder
    waist?: SortOrder
    hip?: SortOrder
    shoulder?: SortOrder
    sleeve?: SortOrder
    height?: SortOrder
    back?: SortOrder
    measure_type?: SortOrder
  }

  export type rent_productsMinOrderByAggregateInput = {
    id?: SortOrder
    rent_id?: SortOrder
    product_id?: SortOrder
    product_price?: SortOrder
    product_description?: SortOrder
    created_at?: SortOrder
    actual_return_buffer_days?: SortOrder
    actual_return_date?: SortOrder
    bust?: SortOrder
    waist?: SortOrder
    hip?: SortOrder
    shoulder?: SortOrder
    sleeve?: SortOrder
    height?: SortOrder
    back?: SortOrder
    measure_type?: SortOrder
  }

  export type rent_productsSumOrderByAggregateInput = {
    product_price?: SortOrder
    actual_return_buffer_days?: SortOrder
    bust?: SortOrder
    waist?: SortOrder
    hip?: SortOrder
    shoulder?: SortOrder
    sleeve?: SortOrder
    height?: SortOrder
    back?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type Enummeasures_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel>
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummeasures_typeWithAggregatesFilter<$PrismaModel> | $Enums.measures_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummeasures_typeFilter<$PrismaModel>
    _max?: NestedEnummeasures_typeFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Enumdiscount_type_enumNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.discount_type_enum | Enumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumdiscount_type_enumNullableFilter<$PrismaModel> | $Enums.discount_type_enum | null
  }

  export type rentsCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    rent_date?: SortOrder
    return_date?: SortOrder
    client_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    total_value?: SortOrder
    discount_type?: SortOrder
    discount_value?: SortOrder
    signal_value?: SortOrder
    remaining_value?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
    updated_at?: SortOrder
    internal_observations?: SortOrder
    receipt_observations?: SortOrder
    code?: SortOrder
  }

  export type rentsAvgOrderByAggregateInput = {
    total_value?: SortOrder
    discount_value?: SortOrder
    signal_value?: SortOrder
    remaining_value?: SortOrder
    code?: SortOrder
  }

  export type rentsMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    rent_date?: SortOrder
    return_date?: SortOrder
    client_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    total_value?: SortOrder
    discount_type?: SortOrder
    discount_value?: SortOrder
    signal_value?: SortOrder
    remaining_value?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
    updated_at?: SortOrder
    internal_observations?: SortOrder
    receipt_observations?: SortOrder
    code?: SortOrder
  }

  export type rentsMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    rent_date?: SortOrder
    return_date?: SortOrder
    client_name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    total_value?: SortOrder
    discount_type?: SortOrder
    discount_value?: SortOrder
    signal_value?: SortOrder
    remaining_value?: SortOrder
    deleted?: SortOrder
    deleted_at?: SortOrder
    updated_at?: SortOrder
    internal_observations?: SortOrder
    receipt_observations?: SortOrder
    code?: SortOrder
  }

  export type rentsSumOrderByAggregateInput = {
    total_value?: SortOrder
    discount_value?: SortOrder
    signal_value?: SortOrder
    remaining_value?: SortOrder
    code?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumdiscount_type_enumNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.discount_type_enum | Enumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumdiscount_type_enumNullableWithAggregatesFilter<$PrismaModel> | $Enums.discount_type_enum | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumdiscount_type_enumNullableFilter<$PrismaModel>
    _max?: NestedEnumdiscount_type_enumNullableFilter<$PrismaModel>
  }

  export type productsCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<productsCreateWithoutCategoriesInput, productsUncheckedCreateWithoutCategoriesInput> | productsCreateWithoutCategoriesInput[] | productsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: productsCreateOrConnectWithoutCategoriesInput | productsCreateOrConnectWithoutCategoriesInput[]
    createMany?: productsCreateManyCategoriesInputEnvelope
    connect?: productsWhereUniqueInput | productsWhereUniqueInput[]
  }

  export type productsUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<productsCreateWithoutCategoriesInput, productsUncheckedCreateWithoutCategoriesInput> | productsCreateWithoutCategoriesInput[] | productsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: productsCreateOrConnectWithoutCategoriesInput | productsCreateOrConnectWithoutCategoriesInput[]
    createMany?: productsCreateManyCategoriesInputEnvelope
    connect?: productsWhereUniqueInput | productsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnummeasures_typeFieldUpdateOperationsInput = {
    set?: $Enums.measures_type | null
  }

  export type productsUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<productsCreateWithoutCategoriesInput, productsUncheckedCreateWithoutCategoriesInput> | productsCreateWithoutCategoriesInput[] | productsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: productsCreateOrConnectWithoutCategoriesInput | productsCreateOrConnectWithoutCategoriesInput[]
    upsert?: productsUpsertWithWhereUniqueWithoutCategoriesInput | productsUpsertWithWhereUniqueWithoutCategoriesInput[]
    createMany?: productsCreateManyCategoriesInputEnvelope
    set?: productsWhereUniqueInput | productsWhereUniqueInput[]
    disconnect?: productsWhereUniqueInput | productsWhereUniqueInput[]
    delete?: productsWhereUniqueInput | productsWhereUniqueInput[]
    connect?: productsWhereUniqueInput | productsWhereUniqueInput[]
    update?: productsUpdateWithWhereUniqueWithoutCategoriesInput | productsUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: productsUpdateManyWithWhereWithoutCategoriesInput | productsUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: productsScalarWhereInput | productsScalarWhereInput[]
  }

  export type productsUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<productsCreateWithoutCategoriesInput, productsUncheckedCreateWithoutCategoriesInput> | productsCreateWithoutCategoriesInput[] | productsUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: productsCreateOrConnectWithoutCategoriesInput | productsCreateOrConnectWithoutCategoriesInput[]
    upsert?: productsUpsertWithWhereUniqueWithoutCategoriesInput | productsUpsertWithWhereUniqueWithoutCategoriesInput[]
    createMany?: productsCreateManyCategoriesInputEnvelope
    set?: productsWhereUniqueInput | productsWhereUniqueInput[]
    disconnect?: productsWhereUniqueInput | productsWhereUniqueInput[]
    delete?: productsWhereUniqueInput | productsWhereUniqueInput[]
    connect?: productsWhereUniqueInput | productsWhereUniqueInput[]
    update?: productsUpdateWithWhereUniqueWithoutCategoriesInput | productsUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: productsUpdateManyWithWhereWithoutCategoriesInput | productsUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: productsScalarWhereInput | productsScalarWhereInput[]
  }

  export type categoriesCreateNestedOneWithoutProductsInput = {
    create?: XOR<categoriesCreateWithoutProductsInput, categoriesUncheckedCreateWithoutProductsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutProductsInput
    connect?: categoriesWhereUniqueInput
  }

  export type rent_productsCreateNestedManyWithoutProductsInput = {
    create?: XOR<rent_productsCreateWithoutProductsInput, rent_productsUncheckedCreateWithoutProductsInput> | rent_productsCreateWithoutProductsInput[] | rent_productsUncheckedCreateWithoutProductsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutProductsInput | rent_productsCreateOrConnectWithoutProductsInput[]
    createMany?: rent_productsCreateManyProductsInputEnvelope
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
  }

  export type rent_productsUncheckedCreateNestedManyWithoutProductsInput = {
    create?: XOR<rent_productsCreateWithoutProductsInput, rent_productsUncheckedCreateWithoutProductsInput> | rent_productsCreateWithoutProductsInput[] | rent_productsUncheckedCreateWithoutProductsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutProductsInput | rent_productsCreateOrConnectWithoutProductsInput[]
    createMany?: rent_productsCreateManyProductsInputEnvelope
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type categoriesUpdateOneWithoutProductsNestedInput = {
    create?: XOR<categoriesCreateWithoutProductsInput, categoriesUncheckedCreateWithoutProductsInput>
    connectOrCreate?: categoriesCreateOrConnectWithoutProductsInput
    upsert?: categoriesUpsertWithoutProductsInput
    disconnect?: categoriesWhereInput | boolean
    delete?: categoriesWhereInput | boolean
    connect?: categoriesWhereUniqueInput
    update?: XOR<XOR<categoriesUpdateToOneWithWhereWithoutProductsInput, categoriesUpdateWithoutProductsInput>, categoriesUncheckedUpdateWithoutProductsInput>
  }

  export type rent_productsUpdateManyWithoutProductsNestedInput = {
    create?: XOR<rent_productsCreateWithoutProductsInput, rent_productsUncheckedCreateWithoutProductsInput> | rent_productsCreateWithoutProductsInput[] | rent_productsUncheckedCreateWithoutProductsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutProductsInput | rent_productsCreateOrConnectWithoutProductsInput[]
    upsert?: rent_productsUpsertWithWhereUniqueWithoutProductsInput | rent_productsUpsertWithWhereUniqueWithoutProductsInput[]
    createMany?: rent_productsCreateManyProductsInputEnvelope
    set?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    disconnect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    delete?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    update?: rent_productsUpdateWithWhereUniqueWithoutProductsInput | rent_productsUpdateWithWhereUniqueWithoutProductsInput[]
    updateMany?: rent_productsUpdateManyWithWhereWithoutProductsInput | rent_productsUpdateManyWithWhereWithoutProductsInput[]
    deleteMany?: rent_productsScalarWhereInput | rent_productsScalarWhereInput[]
  }

  export type rent_productsUncheckedUpdateManyWithoutProductsNestedInput = {
    create?: XOR<rent_productsCreateWithoutProductsInput, rent_productsUncheckedCreateWithoutProductsInput> | rent_productsCreateWithoutProductsInput[] | rent_productsUncheckedCreateWithoutProductsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutProductsInput | rent_productsCreateOrConnectWithoutProductsInput[]
    upsert?: rent_productsUpsertWithWhereUniqueWithoutProductsInput | rent_productsUpsertWithWhereUniqueWithoutProductsInput[]
    createMany?: rent_productsCreateManyProductsInputEnvelope
    set?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    disconnect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    delete?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    update?: rent_productsUpdateWithWhereUniqueWithoutProductsInput | rent_productsUpdateWithWhereUniqueWithoutProductsInput[]
    updateMany?: rent_productsUpdateManyWithWhereWithoutProductsInput | rent_productsUpdateManyWithWhereWithoutProductsInput[]
    deleteMany?: rent_productsScalarWhereInput | rent_productsScalarWhereInput[]
  }

  export type productsCreateNestedOneWithoutRent_productsInput = {
    create?: XOR<productsCreateWithoutRent_productsInput, productsUncheckedCreateWithoutRent_productsInput>
    connectOrCreate?: productsCreateOrConnectWithoutRent_productsInput
    connect?: productsWhereUniqueInput
  }

  export type rentsCreateNestedOneWithoutRent_productsInput = {
    create?: XOR<rentsCreateWithoutRent_productsInput, rentsUncheckedCreateWithoutRent_productsInput>
    connectOrCreate?: rentsCreateOrConnectWithoutRent_productsInput
    connect?: rentsWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type Enummeasures_typeFieldUpdateOperationsInput = {
    set?: $Enums.measures_type
  }

  export type productsUpdateOneRequiredWithoutRent_productsNestedInput = {
    create?: XOR<productsCreateWithoutRent_productsInput, productsUncheckedCreateWithoutRent_productsInput>
    connectOrCreate?: productsCreateOrConnectWithoutRent_productsInput
    upsert?: productsUpsertWithoutRent_productsInput
    connect?: productsWhereUniqueInput
    update?: XOR<XOR<productsUpdateToOneWithWhereWithoutRent_productsInput, productsUpdateWithoutRent_productsInput>, productsUncheckedUpdateWithoutRent_productsInput>
  }

  export type rentsUpdateOneRequiredWithoutRent_productsNestedInput = {
    create?: XOR<rentsCreateWithoutRent_productsInput, rentsUncheckedCreateWithoutRent_productsInput>
    connectOrCreate?: rentsCreateOrConnectWithoutRent_productsInput
    upsert?: rentsUpsertWithoutRent_productsInput
    connect?: rentsWhereUniqueInput
    update?: XOR<XOR<rentsUpdateToOneWithWhereWithoutRent_productsInput, rentsUpdateWithoutRent_productsInput>, rentsUncheckedUpdateWithoutRent_productsInput>
  }

  export type rent_productsCreateNestedManyWithoutRentsInput = {
    create?: XOR<rent_productsCreateWithoutRentsInput, rent_productsUncheckedCreateWithoutRentsInput> | rent_productsCreateWithoutRentsInput[] | rent_productsUncheckedCreateWithoutRentsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutRentsInput | rent_productsCreateOrConnectWithoutRentsInput[]
    createMany?: rent_productsCreateManyRentsInputEnvelope
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
  }

  export type rent_productsUncheckedCreateNestedManyWithoutRentsInput = {
    create?: XOR<rent_productsCreateWithoutRentsInput, rent_productsUncheckedCreateWithoutRentsInput> | rent_productsCreateWithoutRentsInput[] | rent_productsUncheckedCreateWithoutRentsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutRentsInput | rent_productsCreateOrConnectWithoutRentsInput[]
    createMany?: rent_productsCreateManyRentsInputEnvelope
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableEnumdiscount_type_enumFieldUpdateOperationsInput = {
    set?: $Enums.discount_type_enum | null
  }

  export type rent_productsUpdateManyWithoutRentsNestedInput = {
    create?: XOR<rent_productsCreateWithoutRentsInput, rent_productsUncheckedCreateWithoutRentsInput> | rent_productsCreateWithoutRentsInput[] | rent_productsUncheckedCreateWithoutRentsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutRentsInput | rent_productsCreateOrConnectWithoutRentsInput[]
    upsert?: rent_productsUpsertWithWhereUniqueWithoutRentsInput | rent_productsUpsertWithWhereUniqueWithoutRentsInput[]
    createMany?: rent_productsCreateManyRentsInputEnvelope
    set?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    disconnect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    delete?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    update?: rent_productsUpdateWithWhereUniqueWithoutRentsInput | rent_productsUpdateWithWhereUniqueWithoutRentsInput[]
    updateMany?: rent_productsUpdateManyWithWhereWithoutRentsInput | rent_productsUpdateManyWithWhereWithoutRentsInput[]
    deleteMany?: rent_productsScalarWhereInput | rent_productsScalarWhereInput[]
  }

  export type rent_productsUncheckedUpdateManyWithoutRentsNestedInput = {
    create?: XOR<rent_productsCreateWithoutRentsInput, rent_productsUncheckedCreateWithoutRentsInput> | rent_productsCreateWithoutRentsInput[] | rent_productsUncheckedCreateWithoutRentsInput[]
    connectOrCreate?: rent_productsCreateOrConnectWithoutRentsInput | rent_productsCreateOrConnectWithoutRentsInput[]
    upsert?: rent_productsUpsertWithWhereUniqueWithoutRentsInput | rent_productsUpsertWithWhereUniqueWithoutRentsInput[]
    createMany?: rent_productsCreateManyRentsInputEnvelope
    set?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    disconnect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    delete?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    connect?: rent_productsWhereUniqueInput | rent_productsWhereUniqueInput[]
    update?: rent_productsUpdateWithWhereUniqueWithoutRentsInput | rent_productsUpdateWithWhereUniqueWithoutRentsInput[]
    updateMany?: rent_productsUpdateManyWithWhereWithoutRentsInput | rent_productsUpdateManyWithWhereWithoutRentsInput[]
    deleteMany?: rent_productsScalarWhereInput | rent_productsScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnummeasures_typeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnummeasures_typeNullableFilter<$PrismaModel> | $Enums.measures_type | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnummeasures_typeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel> | null
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel> | null
    not?: NestedEnummeasures_typeNullableWithAggregatesFilter<$PrismaModel> | $Enums.measures_type | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnummeasures_typeNullableFilter<$PrismaModel>
    _max?: NestedEnummeasures_typeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnummeasures_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel>
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummeasures_typeFilter<$PrismaModel> | $Enums.measures_type
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnummeasures_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.measures_type | Enummeasures_typeFieldRefInput<$PrismaModel>
    in?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.measures_type[] | ListEnummeasures_typeFieldRefInput<$PrismaModel>
    not?: NestedEnummeasures_typeWithAggregatesFilter<$PrismaModel> | $Enums.measures_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnummeasures_typeFilter<$PrismaModel>
    _max?: NestedEnummeasures_typeFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumdiscount_type_enumNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.discount_type_enum | Enumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumdiscount_type_enumNullableFilter<$PrismaModel> | $Enums.discount_type_enum | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumdiscount_type_enumNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.discount_type_enum | Enumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    in?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.discount_type_enum[] | ListEnumdiscount_type_enumFieldRefInput<$PrismaModel> | null
    not?: NestedEnumdiscount_type_enumNullableWithAggregatesFilter<$PrismaModel> | $Enums.discount_type_enum | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumdiscount_type_enumNullableFilter<$PrismaModel>
    _max?: NestedEnumdiscount_type_enumNullableFilter<$PrismaModel>
  }

  export type productsCreateWithoutCategoriesInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    rent_products?: rent_productsCreateNestedManyWithoutProductsInput
  }

  export type productsUncheckedCreateWithoutCategoriesInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    rent_products?: rent_productsUncheckedCreateNestedManyWithoutProductsInput
  }

  export type productsCreateOrConnectWithoutCategoriesInput = {
    where: productsWhereUniqueInput
    create: XOR<productsCreateWithoutCategoriesInput, productsUncheckedCreateWithoutCategoriesInput>
  }

  export type productsCreateManyCategoriesInputEnvelope = {
    data: productsCreateManyCategoriesInput | productsCreateManyCategoriesInput[]
    skipDuplicates?: boolean
  }

  export type productsUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: productsWhereUniqueInput
    update: XOR<productsUpdateWithoutCategoriesInput, productsUncheckedUpdateWithoutCategoriesInput>
    create: XOR<productsCreateWithoutCategoriesInput, productsUncheckedCreateWithoutCategoriesInput>
  }

  export type productsUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: productsWhereUniqueInput
    data: XOR<productsUpdateWithoutCategoriesInput, productsUncheckedUpdateWithoutCategoriesInput>
  }

  export type productsUpdateManyWithWhereWithoutCategoriesInput = {
    where: productsScalarWhereInput
    data: XOR<productsUpdateManyMutationInput, productsUncheckedUpdateManyWithoutCategoriesInput>
  }

  export type productsScalarWhereInput = {
    AND?: productsScalarWhereInput | productsScalarWhereInput[]
    OR?: productsScalarWhereInput[]
    NOT?: productsScalarWhereInput | productsScalarWhereInput[]
    id?: UuidFilter<"products"> | string
    reference?: StringFilter<"products"> | string
    description?: StringNullableFilter<"products"> | string | null
    receipt_description?: StringNullableFilter<"products"> | string | null
    category_id?: UuidNullableFilter<"products"> | string | null
    price?: DecimalFilter<"products"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeNullableFilter<"products"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"products"> | Date | string | null
    deleted?: BoolNullableFilter<"products"> | boolean | null
    deleted_at?: DateTimeNullableFilter<"products"> | Date | string | null
  }

  export type categoriesCreateWithoutProductsInput = {
    id?: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    post_return_buffer_days?: number | null
    measure_type?: $Enums.measures_type | null
  }

  export type categoriesUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    post_return_buffer_days?: number | null
    measure_type?: $Enums.measures_type | null
  }

  export type categoriesCreateOrConnectWithoutProductsInput = {
    where: categoriesWhereUniqueInput
    create: XOR<categoriesCreateWithoutProductsInput, categoriesUncheckedCreateWithoutProductsInput>
  }

  export type rent_productsCreateWithoutProductsInput = {
    id?: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
    rents: rentsCreateNestedOneWithoutRent_productsInput
  }

  export type rent_productsUncheckedCreateWithoutProductsInput = {
    id?: string
    rent_id: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
  }

  export type rent_productsCreateOrConnectWithoutProductsInput = {
    where: rent_productsWhereUniqueInput
    create: XOR<rent_productsCreateWithoutProductsInput, rent_productsUncheckedCreateWithoutProductsInput>
  }

  export type rent_productsCreateManyProductsInputEnvelope = {
    data: rent_productsCreateManyProductsInput | rent_productsCreateManyProductsInput[]
    skipDuplicates?: boolean
  }

  export type categoriesUpsertWithoutProductsInput = {
    update: XOR<categoriesUpdateWithoutProductsInput, categoriesUncheckedUpdateWithoutProductsInput>
    create: XOR<categoriesCreateWithoutProductsInput, categoriesUncheckedCreateWithoutProductsInput>
    where?: categoriesWhereInput
  }

  export type categoriesUpdateToOneWithWhereWithoutProductsInput = {
    where?: categoriesWhereInput
    data: XOR<categoriesUpdateWithoutProductsInput, categoriesUncheckedUpdateWithoutProductsInput>
  }

  export type categoriesUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    measure_type?: NullableEnummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type | null
  }

  export type categoriesUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    post_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    measure_type?: NullableEnummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type | null
  }

  export type rent_productsUpsertWithWhereUniqueWithoutProductsInput = {
    where: rent_productsWhereUniqueInput
    update: XOR<rent_productsUpdateWithoutProductsInput, rent_productsUncheckedUpdateWithoutProductsInput>
    create: XOR<rent_productsCreateWithoutProductsInput, rent_productsUncheckedCreateWithoutProductsInput>
  }

  export type rent_productsUpdateWithWhereUniqueWithoutProductsInput = {
    where: rent_productsWhereUniqueInput
    data: XOR<rent_productsUpdateWithoutProductsInput, rent_productsUncheckedUpdateWithoutProductsInput>
  }

  export type rent_productsUpdateManyWithWhereWithoutProductsInput = {
    where: rent_productsScalarWhereInput
    data: XOR<rent_productsUpdateManyMutationInput, rent_productsUncheckedUpdateManyWithoutProductsInput>
  }

  export type rent_productsScalarWhereInput = {
    AND?: rent_productsScalarWhereInput | rent_productsScalarWhereInput[]
    OR?: rent_productsScalarWhereInput[]
    NOT?: rent_productsScalarWhereInput | rent_productsScalarWhereInput[]
    id?: UuidFilter<"rent_products"> | string
    rent_id?: UuidFilter<"rent_products"> | string
    product_id?: UuidFilter<"rent_products"> | string
    product_price?: DecimalFilter<"rent_products"> | Decimal | DecimalJsLike | number | string
    product_description?: StringFilter<"rent_products"> | string
    created_at?: DateTimeNullableFilter<"rent_products"> | Date | string | null
    actual_return_buffer_days?: IntNullableFilter<"rent_products"> | number | null
    actual_return_date?: DateTimeNullableFilter<"rent_products"> | Date | string | null
    bust?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    waist?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    hip?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    shoulder?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    sleeve?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    height?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    back?: DecimalNullableFilter<"rent_products"> | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFilter<"rent_products"> | $Enums.measures_type
  }

  export type productsCreateWithoutRent_productsInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    categories?: categoriesCreateNestedOneWithoutProductsInput
  }

  export type productsUncheckedCreateWithoutRent_productsInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    category_id?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
  }

  export type productsCreateOrConnectWithoutRent_productsInput = {
    where: productsWhereUniqueInput
    create: XOR<productsCreateWithoutRent_productsInput, productsUncheckedCreateWithoutRent_productsInput>
  }

  export type rentsCreateWithoutRent_productsInput = {
    id?: string
    created_at?: Date | string | null
    rent_date: Date | string
    return_date?: Date | string | null
    client_name: string
    address?: string | null
    phone?: string | null
    total_value: Decimal | DecimalJsLike | number | string
    discount_type?: $Enums.discount_type_enum | null
    discount_value?: Decimal | DecimalJsLike | number | string | null
    signal_value?: Decimal | DecimalJsLike | number | string | null
    remaining_value?: Decimal | DecimalJsLike | number | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    updated_at?: Date | string | null
    internal_observations?: string | null
    receipt_observations?: string | null
    code?: Decimal | DecimalJsLike | number | string
  }

  export type rentsUncheckedCreateWithoutRent_productsInput = {
    id?: string
    created_at?: Date | string | null
    rent_date: Date | string
    return_date?: Date | string | null
    client_name: string
    address?: string | null
    phone?: string | null
    total_value: Decimal | DecimalJsLike | number | string
    discount_type?: $Enums.discount_type_enum | null
    discount_value?: Decimal | DecimalJsLike | number | string | null
    signal_value?: Decimal | DecimalJsLike | number | string | null
    remaining_value?: Decimal | DecimalJsLike | number | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
    updated_at?: Date | string | null
    internal_observations?: string | null
    receipt_observations?: string | null
    code?: Decimal | DecimalJsLike | number | string
  }

  export type rentsCreateOrConnectWithoutRent_productsInput = {
    where: rentsWhereUniqueInput
    create: XOR<rentsCreateWithoutRent_productsInput, rentsUncheckedCreateWithoutRent_productsInput>
  }

  export type productsUpsertWithoutRent_productsInput = {
    update: XOR<productsUpdateWithoutRent_productsInput, productsUncheckedUpdateWithoutRent_productsInput>
    create: XOR<productsCreateWithoutRent_productsInput, productsUncheckedCreateWithoutRent_productsInput>
    where?: productsWhereInput
  }

  export type productsUpdateToOneWithWhereWithoutRent_productsInput = {
    where?: productsWhereInput
    data: XOR<productsUpdateWithoutRent_productsInput, productsUncheckedUpdateWithoutRent_productsInput>
  }

  export type productsUpdateWithoutRent_productsInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categories?: categoriesUpdateOneWithoutProductsNestedInput
  }

  export type productsUncheckedUpdateWithoutRent_productsInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    category_id?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rentsUpsertWithoutRent_productsInput = {
    update: XOR<rentsUpdateWithoutRent_productsInput, rentsUncheckedUpdateWithoutRent_productsInput>
    create: XOR<rentsCreateWithoutRent_productsInput, rentsUncheckedCreateWithoutRent_productsInput>
    where?: rentsWhereInput
  }

  export type rentsUpdateToOneWithWhereWithoutRent_productsInput = {
    where?: rentsWhereInput
    data: XOR<rentsUpdateWithoutRent_productsInput, rentsUncheckedUpdateWithoutRent_productsInput>
  }

  export type rentsUpdateWithoutRent_productsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    total_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount_type?: NullableEnumdiscount_type_enumFieldUpdateOperationsInput | $Enums.discount_type_enum | null
    discount_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    signal_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remaining_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internal_observations?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_observations?: NullableStringFieldUpdateOperationsInput | string | null
    code?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type rentsUncheckedUpdateWithoutRent_productsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    total_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discount_type?: NullableEnumdiscount_type_enumFieldUpdateOperationsInput | $Enums.discount_type_enum | null
    discount_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    signal_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    remaining_value?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    internal_observations?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_observations?: NullableStringFieldUpdateOperationsInput | string | null
    code?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type rent_productsCreateWithoutRentsInput = {
    id?: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
    products: productsCreateNestedOneWithoutRent_productsInput
  }

  export type rent_productsUncheckedCreateWithoutRentsInput = {
    id?: string
    product_id: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
  }

  export type rent_productsCreateOrConnectWithoutRentsInput = {
    where: rent_productsWhereUniqueInput
    create: XOR<rent_productsCreateWithoutRentsInput, rent_productsUncheckedCreateWithoutRentsInput>
  }

  export type rent_productsCreateManyRentsInputEnvelope = {
    data: rent_productsCreateManyRentsInput | rent_productsCreateManyRentsInput[]
    skipDuplicates?: boolean
  }

  export type rent_productsUpsertWithWhereUniqueWithoutRentsInput = {
    where: rent_productsWhereUniqueInput
    update: XOR<rent_productsUpdateWithoutRentsInput, rent_productsUncheckedUpdateWithoutRentsInput>
    create: XOR<rent_productsCreateWithoutRentsInput, rent_productsUncheckedCreateWithoutRentsInput>
  }

  export type rent_productsUpdateWithWhereUniqueWithoutRentsInput = {
    where: rent_productsWhereUniqueInput
    data: XOR<rent_productsUpdateWithoutRentsInput, rent_productsUncheckedUpdateWithoutRentsInput>
  }

  export type rent_productsUpdateManyWithWhereWithoutRentsInput = {
    where: rent_productsScalarWhereInput
    data: XOR<rent_productsUpdateManyMutationInput, rent_productsUncheckedUpdateManyWithoutRentsInput>
  }

  export type productsCreateManyCategoriesInput = {
    id?: string
    reference: string
    description?: string | null
    receipt_description?: string | null
    price: Decimal | DecimalJsLike | number | string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted?: boolean | null
    deleted_at?: Date | string | null
  }

  export type productsUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_products?: rent_productsUpdateManyWithoutProductsNestedInput
  }

  export type productsUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rent_products?: rent_productsUncheckedUpdateManyWithoutProductsNestedInput
  }

  export type productsUncheckedUpdateManyWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    receipt_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rent_productsCreateManyProductsInput = {
    id?: string
    rent_id: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
  }

  export type rent_productsUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
    rents?: rentsUpdateOneRequiredWithoutRent_productsNestedInput
  }

  export type rent_productsUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rent_id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
  }

  export type rent_productsUncheckedUpdateManyWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rent_id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
  }

  export type rent_productsCreateManyRentsInput = {
    id?: string
    product_id: string
    product_price: Decimal | DecimalJsLike | number | string
    product_description: string
    created_at?: Date | string | null
    actual_return_buffer_days?: number | null
    actual_return_date?: Date | string | null
    bust?: Decimal | DecimalJsLike | number | string | null
    waist?: Decimal | DecimalJsLike | number | string | null
    hip?: Decimal | DecimalJsLike | number | string | null
    shoulder?: Decimal | DecimalJsLike | number | string | null
    sleeve?: Decimal | DecimalJsLike | number | string | null
    height?: Decimal | DecimalJsLike | number | string | null
    back?: Decimal | DecimalJsLike | number | string | null
    measure_type: $Enums.measures_type
  }

  export type rent_productsUpdateWithoutRentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
    products?: productsUpdateOneRequiredWithoutRent_productsNestedInput
  }

  export type rent_productsUncheckedUpdateWithoutRentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
  }

  export type rent_productsUncheckedUpdateManyWithoutRentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    product_id?: StringFieldUpdateOperationsInput | string
    product_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    product_description?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    actual_return_buffer_days?: NullableIntFieldUpdateOperationsInput | number | null
    actual_return_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bust?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    waist?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    hip?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    shoulder?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    sleeve?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    height?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    back?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    measure_type?: Enummeasures_typeFieldUpdateOperationsInput | $Enums.measures_type
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}