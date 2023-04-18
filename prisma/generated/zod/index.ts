import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const EventScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','leftOption','rightOption','description','league','startTime','endTime']);

export const PickScalarFieldEnumSchema = z.enum(['id','userId','eventId','option','status','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const StreakScalarFieldEnumSchema = z.enum(['id','userId','started','ended','updated','count','type']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','createdAt','updatedAt','currentStreakId','isPro']);

export const StreakTypeSchema = z.enum(['WIN','LOSS']);

export type StreakTypeType = `${z.infer<typeof StreakTypeSchema>}`

export const StatusSchema = z.enum(['WIN','LOSS','PENDING','CANCELLED','DRAW']);

export type StatusType = `${z.infer<typeof StatusSchema>}`

export const PickTypeSchema = z.enum(['LEFT','RIGHT','NONE']);

export type PickTypeType = `${z.infer<typeof PickTypeSchema>}`

export const LeagueSchema = z.enum(['NBA','MLB','NFL','NHL','OTHER']);

export type LeagueType = `${z.infer<typeof LeagueSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  league: LeagueSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  leftOption: z.string(),
  rightOption: z.string(),
  description: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// PICK SCHEMA
/////////////////////////////////////////

export const PickSchema = z.object({
  option: PickTypeSchema,
  status: StatusSchema,
  id: z.string().cuid(),
  userId: z.string(),
  eventId: z.string(),
  updatedAt: z.coerce.date(),
})

export type Pick = z.infer<typeof PickSchema>

/////////////////////////////////////////
// STREAK SCHEMA
/////////////////////////////////////////

export const StreakSchema = z.object({
  type: StreakTypeSchema,
  id: z.string(),
  userId: z.string(),
  started: z.coerce.date(),
  ended: z.coerce.date(),
  updated: z.coerce.date(),
  count: z.number().int(),
})

export type Streak = z.infer<typeof StreakSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  currentStreakId: z.string(),
  isPro: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  picks: z.union([z.boolean(),z.lazy(() => PickFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  picks: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  leftOption: z.boolean().optional(),
  rightOption: z.boolean().optional(),
  description: z.boolean().optional(),
  league: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  picks: z.union([z.boolean(),z.lazy(() => PickFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PICK
//------------------------------------------------------

export const PickIncludeSchema: z.ZodType<Prisma.PickInclude> = z.object({
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PickArgsSchema: z.ZodType<Prisma.PickArgs> = z.object({
  select: z.lazy(() => PickSelectSchema).optional(),
  include: z.lazy(() => PickIncludeSchema).optional(),
}).strict();

export const PickSelectSchema: z.ZodType<Prisma.PickSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  eventId: z.boolean().optional(),
  option: z.boolean().optional(),
  status: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// STREAK
//------------------------------------------------------

export const StreakIncludeSchema: z.ZodType<Prisma.StreakInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const StreakArgsSchema: z.ZodType<Prisma.StreakArgs> = z.object({
  select: z.lazy(() => StreakSelectSchema).optional(),
  include: z.lazy(() => StreakIncludeSchema).optional(),
}).strict();

export const StreakSelectSchema: z.ZodType<Prisma.StreakSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  started: z.boolean().optional(),
  ended: z.boolean().optional(),
  updated: z.boolean().optional(),
  count: z.boolean().optional(),
  type: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  picks: z.union([z.boolean(),z.lazy(() => PickFindManyArgsSchema)]).optional(),
  streaks: z.union([z.boolean(),z.lazy(() => StreakFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  picks: z.boolean().optional(),
  streaks: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  currentStreakId: z.boolean().optional(),
  isPro: z.boolean().optional(),
  picks: z.union([z.boolean(),z.lazy(() => PickFindManyArgsSchema)]).optional(),
  streaks: z.union([z.boolean(),z.lazy(() => StreakFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  leftOption: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rightOption: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  league: z.union([ z.lazy(() => EnumLeagueFilterSchema),z.lazy(() => LeagueSchema) ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  picks: z.lazy(() => PickListRelationFilterSchema).optional()
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  leftOption: z.lazy(() => SortOrderSchema).optional(),
  rightOption: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  league: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  picks: z.lazy(() => PickOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  leftOption: z.lazy(() => SortOrderSchema).optional(),
  rightOption: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  league: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  leftOption: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rightOption: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  league: z.union([ z.lazy(() => EnumLeagueWithAggregatesFilterSchema),z.lazy(() => LeagueSchema) ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PickWhereInputSchema: z.ZodType<Prisma.PickWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PickWhereInputSchema),z.lazy(() => PickWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PickWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PickWhereInputSchema),z.lazy(() => PickWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  option: z.union([ z.lazy(() => EnumPickTypeFilterSchema),z.lazy(() => PickTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  event: z.union([ z.lazy(() => EventRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PickOrderByWithRelationInputSchema: z.ZodType<Prisma.PickOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  option: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PickWhereUniqueInputSchema: z.ZodType<Prisma.PickWhereUniqueInput> = z.object({
  id: z.string().cuid().optional(),
  userId_eventId: z.lazy(() => PickUserIdEventIdCompoundUniqueInputSchema).optional()
}).strict();

export const PickOrderByWithAggregationInputSchema: z.ZodType<Prisma.PickOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  option: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PickCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PickMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PickMinOrderByAggregateInputSchema).optional()
}).strict();

export const PickScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PickScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PickScalarWhereWithAggregatesInputSchema),z.lazy(() => PickScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PickScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PickScalarWhereWithAggregatesInputSchema),z.lazy(() => PickScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  option: z.union([ z.lazy(() => EnumPickTypeWithAggregatesFilterSchema),z.lazy(() => PickTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusWithAggregatesFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const StreakWhereInputSchema: z.ZodType<Prisma.StreakWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StreakWhereInputSchema),z.lazy(() => StreakWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakWhereInputSchema),z.lazy(() => StreakWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  started: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ended: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  count: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumStreakTypeFilterSchema),z.lazy(() => StreakTypeSchema) ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const StreakOrderByWithRelationInputSchema: z.ZodType<Prisma.StreakOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  ended: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const StreakWhereUniqueInputSchema: z.ZodType<Prisma.StreakWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const StreakOrderByWithAggregationInputSchema: z.ZodType<Prisma.StreakOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  ended: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StreakCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => StreakAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StreakMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StreakMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => StreakSumOrderByAggregateInputSchema).optional()
}).strict();

export const StreakScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StreakScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StreakScalarWhereWithAggregatesInputSchema),z.lazy(() => StreakScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakScalarWhereWithAggregatesInputSchema),z.lazy(() => StreakScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  started: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ended: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  count: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumStreakTypeWithAggregatesFilterSchema),z.lazy(() => StreakTypeSchema) ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  currentStreakId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPro: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  picks: z.lazy(() => PickListRelationFilterSchema).optional(),
  streaks: z.lazy(() => StreakListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currentStreakId: z.lazy(() => SortOrderSchema).optional(),
  isPro: z.lazy(() => SortOrderSchema).optional(),
  picks: z.lazy(() => PickOrderByRelationAggregateInputSchema).optional(),
  streaks: z.lazy(() => StreakOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currentStreakId: z.lazy(() => SortOrderSchema).optional(),
  isPro: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  currentStreakId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isPro: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  leftOption: z.string(),
  rightOption: z.string(),
  description: z.string(),
  league: z.lazy(() => LeagueSchema).optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  picks: z.lazy(() => PickCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  leftOption: z.string(),
  rightOption: z.string(),
  description: z.string(),
  league: z.lazy(() => LeagueSchema).optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  picks: z.lazy(() => PickUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  leftOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rightOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  league: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => EnumLeagueFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  picks: z.lazy(() => PickUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  leftOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rightOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  league: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => EnumLeagueFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  picks: z.lazy(() => PickUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  leftOption: z.string(),
  rightOption: z.string(),
  description: z.string(),
  league: z.lazy(() => LeagueSchema).optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  leftOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rightOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  league: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => EnumLeagueFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  leftOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rightOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  league: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => EnumLeagueFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PickCreateInputSchema: z.ZodType<Prisma.PickCreateInput> = z.object({
  id: z.string().cuid().optional(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutPicksInputSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutPicksInputSchema)
}).strict();

export const PickUncheckedCreateInputSchema: z.ZodType<Prisma.PickUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  eventId: z.string(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PickUpdateInputSchema: z.ZodType<Prisma.PickUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutPicksNestedInputSchema).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutPicksNestedInputSchema).optional()
}).strict();

export const PickUncheckedUpdateInputSchema: z.ZodType<Prisma.PickUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PickCreateManyInputSchema: z.ZodType<Prisma.PickCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  eventId: z.string(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PickUpdateManyMutationInputSchema: z.ZodType<Prisma.PickUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PickUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PickUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreakCreateInputSchema: z.ZodType<Prisma.StreakCreateInput> = z.object({
  id: z.string(),
  started: z.coerce.date().optional(),
  ended: z.coerce.date(),
  updated: z.coerce.date().optional(),
  count: z.number().int().optional(),
  type: z.lazy(() => StreakTypeSchema),
  User: z.lazy(() => UserCreateNestedOneWithoutStreaksInputSchema)
}).strict();

export const StreakUncheckedCreateInputSchema: z.ZodType<Prisma.StreakUncheckedCreateInput> = z.object({
  id: z.string(),
  userId: z.string(),
  started: z.coerce.date().optional(),
  ended: z.coerce.date(),
  updated: z.coerce.date().optional(),
  count: z.number().int().optional(),
  type: z.lazy(() => StreakTypeSchema)
}).strict();

export const StreakUpdateInputSchema: z.ZodType<Prisma.StreakUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => EnumStreakTypeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutStreaksNestedInputSchema).optional()
}).strict();

export const StreakUncheckedUpdateInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => EnumStreakTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreakCreateManyInputSchema: z.ZodType<Prisma.StreakCreateManyInput> = z.object({
  id: z.string(),
  userId: z.string(),
  started: z.coerce.date().optional(),
  ended: z.coerce.date(),
  updated: z.coerce.date().optional(),
  count: z.number().int().optional(),
  type: z.lazy(() => StreakTypeSchema)
}).strict();

export const StreakUpdateManyMutationInputSchema: z.ZodType<Prisma.StreakUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => EnumStreakTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreakUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => EnumStreakTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  currentStreakId: z.string(),
  isPro: z.boolean().optional(),
  picks: z.lazy(() => PickCreateNestedManyWithoutUserInputSchema).optional(),
  streaks: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  currentStreakId: z.string(),
  isPro: z.boolean().optional(),
  picks: z.lazy(() => PickUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  streaks: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  picks: z.lazy(() => PickUpdateManyWithoutUserNestedInputSchema).optional(),
  streaks: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  picks: z.lazy(() => PickUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  streaks: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  currentStreakId: z.string(),
  isPro: z.boolean().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const EnumLeagueFilterSchema: z.ZodType<Prisma.EnumLeagueFilter> = z.object({
  equals: z.lazy(() => LeagueSchema).optional(),
  in: z.lazy(() => LeagueSchema).array().optional(),
  notIn: z.lazy(() => LeagueSchema).array().optional(),
  not: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => NestedEnumLeagueFilterSchema) ]).optional(),
}).strict();

export const PickListRelationFilterSchema: z.ZodType<Prisma.PickListRelationFilter> = z.object({
  every: z.lazy(() => PickWhereInputSchema).optional(),
  some: z.lazy(() => PickWhereInputSchema).optional(),
  none: z.lazy(() => PickWhereInputSchema).optional()
}).strict();

export const PickOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PickOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  leftOption: z.lazy(() => SortOrderSchema).optional(),
  rightOption: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  league: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  leftOption: z.lazy(() => SortOrderSchema).optional(),
  rightOption: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  league: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  leftOption: z.lazy(() => SortOrderSchema).optional(),
  rightOption: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  league: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumLeagueWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLeagueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LeagueSchema).optional(),
  in: z.lazy(() => LeagueSchema).array().optional(),
  notIn: z.lazy(() => LeagueSchema).array().optional(),
  not: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => NestedEnumLeagueWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLeagueFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLeagueFilterSchema).optional()
}).strict();

export const EnumPickTypeFilterSchema: z.ZodType<Prisma.EnumPickTypeFilter> = z.object({
  equals: z.lazy(() => PickTypeSchema).optional(),
  in: z.lazy(() => PickTypeSchema).array().optional(),
  notIn: z.lazy(() => PickTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => NestedEnumPickTypeFilterSchema) ]).optional(),
}).strict();

export const EnumStatusFilterSchema: z.ZodType<Prisma.EnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict();

export const EventRelationFilterSchema: z.ZodType<Prisma.EventRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PickUserIdEventIdCompoundUniqueInputSchema: z.ZodType<Prisma.PickUserIdEventIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  eventId: z.string()
}).strict();

export const PickCountOrderByAggregateInputSchema: z.ZodType<Prisma.PickCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  option: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PickMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PickMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  option: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PickMinOrderByAggregateInputSchema: z.ZodType<Prisma.PickMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  option: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPickTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPickTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PickTypeSchema).optional(),
  in: z.lazy(() => PickTypeSchema).array().optional(),
  notIn: z.lazy(() => PickTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => NestedEnumPickTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPickTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPickTypeFilterSchema).optional()
}).strict();

export const EnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const EnumStreakTypeFilterSchema: z.ZodType<Prisma.EnumStreakTypeFilter> = z.object({
  equals: z.lazy(() => StreakTypeSchema).optional(),
  in: z.lazy(() => StreakTypeSchema).array().optional(),
  notIn: z.lazy(() => StreakTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => NestedEnumStreakTypeFilterSchema) ]).optional(),
}).strict();

export const StreakCountOrderByAggregateInputSchema: z.ZodType<Prisma.StreakCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  ended: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreakAvgOrderByAggregateInputSchema: z.ZodType<Prisma.StreakAvgOrderByAggregateInput> = z.object({
  count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreakMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StreakMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  ended: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreakMinOrderByAggregateInputSchema: z.ZodType<Prisma.StreakMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  started: z.lazy(() => SortOrderSchema).optional(),
  ended: z.lazy(() => SortOrderSchema).optional(),
  updated: z.lazy(() => SortOrderSchema).optional(),
  count: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StreakSumOrderByAggregateInputSchema: z.ZodType<Prisma.StreakSumOrderByAggregateInput> = z.object({
  count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumStreakTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumStreakTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StreakTypeSchema).optional(),
  in: z.lazy(() => StreakTypeSchema).array().optional(),
  notIn: z.lazy(() => StreakTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => NestedEnumStreakTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStreakTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStreakTypeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const StreakListRelationFilterSchema: z.ZodType<Prisma.StreakListRelationFilter> = z.object({
  every: z.lazy(() => StreakWhereInputSchema).optional(),
  some: z.lazy(() => StreakWhereInputSchema).optional(),
  none: z.lazy(() => StreakWhereInputSchema).optional()
}).strict();

export const StreakOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StreakOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currentStreakId: z.lazy(() => SortOrderSchema).optional(),
  isPro: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currentStreakId: z.lazy(() => SortOrderSchema).optional(),
  isPro: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  currentStreakId: z.lazy(() => SortOrderSchema).optional(),
  isPro: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const PickCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.PickCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutEventInputSchema),z.lazy(() => PickCreateWithoutEventInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutEventInputSchema),z.lazy(() => PickCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PickUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.PickUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutEventInputSchema),z.lazy(() => PickCreateWithoutEventInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutEventInputSchema),z.lazy(() => PickCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const EnumLeagueFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLeagueFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => LeagueSchema).optional()
}).strict();

export const PickUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.PickUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutEventInputSchema),z.lazy(() => PickCreateWithoutEventInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutEventInputSchema),z.lazy(() => PickCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PickUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => PickUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PickUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => PickUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PickUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => PickUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PickScalarWhereInputSchema),z.lazy(() => PickScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PickUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.PickUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutEventInputSchema),z.lazy(() => PickCreateWithoutEventInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutEventInputSchema),z.lazy(() => PickCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PickUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => PickUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PickUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => PickUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PickUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => PickUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PickScalarWhereInputSchema),z.lazy(() => PickScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutPicksInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutPicksInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutPicksInputSchema),z.lazy(() => EventUncheckedCreateWithoutPicksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutPicksInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPicksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPicksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPicksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPicksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPicksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumPickTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPickTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PickTypeSchema).optional()
}).strict();

export const EnumStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StatusSchema).optional()
}).strict();

export const EventUpdateOneRequiredWithoutPicksNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutPicksNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutPicksInputSchema),z.lazy(() => EventUncheckedCreateWithoutPicksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutPicksInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutPicksInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateWithoutPicksInputSchema),z.lazy(() => EventUncheckedUpdateWithoutPicksInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPicksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPicksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPicksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPicksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPicksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPicksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutPicksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPicksInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutStreaksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutStreaksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStreaksInputSchema),z.lazy(() => UserUncheckedCreateWithoutStreaksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStreaksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumStreakTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumStreakTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => StreakTypeSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutStreaksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutStreaksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutStreaksInputSchema),z.lazy(() => UserUncheckedCreateWithoutStreaksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutStreaksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutStreaksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutStreaksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStreaksInputSchema) ]).optional(),
}).strict();

export const PickCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PickCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutUserInputSchema),z.lazy(() => PickCreateWithoutUserInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutUserInputSchema),z.lazy(() => PickCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StreakCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.StreakCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema),z.lazy(() => StreakCreateWithoutUserInputSchema).array(),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema),z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PickUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PickUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutUserInputSchema),z.lazy(() => PickCreateWithoutUserInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutUserInputSchema),z.lazy(() => PickCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StreakUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.StreakUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema),z.lazy(() => StreakCreateWithoutUserInputSchema).array(),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema),z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const PickUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PickUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutUserInputSchema),z.lazy(() => PickCreateWithoutUserInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutUserInputSchema),z.lazy(() => PickCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PickUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PickUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PickUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PickUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PickUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PickUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PickScalarWhereInputSchema),z.lazy(() => PickScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StreakUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.StreakUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema),z.lazy(() => StreakCreateWithoutUserInputSchema).array(),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema),z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakScalarWhereInputSchema),z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PickUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PickUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PickCreateWithoutUserInputSchema),z.lazy(() => PickCreateWithoutUserInputSchema).array(),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PickCreateOrConnectWithoutUserInputSchema),z.lazy(() => PickCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PickUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PickUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PickCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PickWhereUniqueInputSchema),z.lazy(() => PickWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PickUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PickUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PickUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PickUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PickScalarWhereInputSchema),z.lazy(() => PickScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StreakUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema),z.lazy(() => StreakCreateWithoutUserInputSchema).array(),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema),z.lazy(() => StreakCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StreakUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StreakCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StreakWhereUniqueInputSchema),z.lazy(() => StreakWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => StreakUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => StreakUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StreakScalarWhereInputSchema),z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumLeagueFilterSchema: z.ZodType<Prisma.NestedEnumLeagueFilter> = z.object({
  equals: z.lazy(() => LeagueSchema).optional(),
  in: z.lazy(() => LeagueSchema).array().optional(),
  notIn: z.lazy(() => LeagueSchema).array().optional(),
  not: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => NestedEnumLeagueFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumLeagueWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLeagueWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LeagueSchema).optional(),
  in: z.lazy(() => LeagueSchema).array().optional(),
  notIn: z.lazy(() => LeagueSchema).array().optional(),
  not: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => NestedEnumLeagueWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLeagueFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLeagueFilterSchema).optional()
}).strict();

export const NestedEnumPickTypeFilterSchema: z.ZodType<Prisma.NestedEnumPickTypeFilter> = z.object({
  equals: z.lazy(() => PickTypeSchema).optional(),
  in: z.lazy(() => PickTypeSchema).array().optional(),
  notIn: z.lazy(() => PickTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => NestedEnumPickTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumStatusFilterSchema: z.ZodType<Prisma.NestedEnumStatusFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPickTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPickTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PickTypeSchema).optional(),
  in: z.lazy(() => PickTypeSchema).array().optional(),
  notIn: z.lazy(() => PickTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => NestedEnumPickTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPickTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPickTypeFilterSchema).optional()
}).strict();

export const NestedEnumStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StatusSchema).optional(),
  in: z.lazy(() => StatusSchema).array().optional(),
  notIn: z.lazy(() => StatusSchema).array().optional(),
  not: z.union([ z.lazy(() => StatusSchema),z.lazy(() => NestedEnumStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStatusFilterSchema).optional()
}).strict();

export const NestedEnumStreakTypeFilterSchema: z.ZodType<Prisma.NestedEnumStreakTypeFilter> = z.object({
  equals: z.lazy(() => StreakTypeSchema).optional(),
  in: z.lazy(() => StreakTypeSchema).array().optional(),
  notIn: z.lazy(() => StreakTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => NestedEnumStreakTypeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumStreakTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumStreakTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => StreakTypeSchema).optional(),
  in: z.lazy(() => StreakTypeSchema).array().optional(),
  notIn: z.lazy(() => StreakTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => NestedEnumStreakTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumStreakTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumStreakTypeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const PickCreateWithoutEventInputSchema: z.ZodType<Prisma.PickCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutPicksInputSchema)
}).strict();

export const PickUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.PickUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PickCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.PickCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => PickWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PickCreateWithoutEventInputSchema),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const PickCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.PickCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PickCreateManyEventInputSchema),z.lazy(() => PickCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PickUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.PickUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => PickWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PickUpdateWithoutEventInputSchema),z.lazy(() => PickUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => PickCreateWithoutEventInputSchema),z.lazy(() => PickUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const PickUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.PickUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => PickWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PickUpdateWithoutEventInputSchema),z.lazy(() => PickUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const PickUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.PickUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => PickScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PickUpdateManyMutationInputSchema),z.lazy(() => PickUncheckedUpdateManyWithoutPicksInputSchema) ]),
}).strict();

export const PickScalarWhereInputSchema: z.ZodType<Prisma.PickScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PickScalarWhereInputSchema),z.lazy(() => PickScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PickScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PickScalarWhereInputSchema),z.lazy(() => PickScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  option: z.union([ z.lazy(() => EnumPickTypeFilterSchema),z.lazy(() => PickTypeSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumStatusFilterSchema),z.lazy(() => StatusSchema) ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventCreateWithoutPicksInputSchema: z.ZodType<Prisma.EventCreateWithoutPicksInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  leftOption: z.string(),
  rightOption: z.string(),
  description: z.string(),
  league: z.lazy(() => LeagueSchema).optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).strict();

export const EventUncheckedCreateWithoutPicksInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutPicksInput> = z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  leftOption: z.string(),
  rightOption: z.string(),
  description: z.string(),
  league: z.lazy(() => LeagueSchema).optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date()
}).strict();

export const EventCreateOrConnectWithoutPicksInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutPicksInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutPicksInputSchema),z.lazy(() => EventUncheckedCreateWithoutPicksInputSchema) ]),
}).strict();

export const UserCreateWithoutPicksInputSchema: z.ZodType<Prisma.UserCreateWithoutPicksInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  currentStreakId: z.string(),
  isPro: z.boolean().optional(),
  streaks: z.lazy(() => StreakCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPicksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPicksInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  currentStreakId: z.string(),
  isPro: z.boolean().optional(),
  streaks: z.lazy(() => StreakUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPicksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPicksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPicksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPicksInputSchema) ]),
}).strict();

export const EventUpsertWithoutPicksInputSchema: z.ZodType<Prisma.EventUpsertWithoutPicksInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutPicksInputSchema),z.lazy(() => EventUncheckedUpdateWithoutPicksInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutPicksInputSchema),z.lazy(() => EventUncheckedCreateWithoutPicksInputSchema) ]),
}).strict();

export const EventUpdateWithoutPicksInputSchema: z.ZodType<Prisma.EventUpdateWithoutPicksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  leftOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rightOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  league: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => EnumLeagueFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateWithoutPicksInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutPicksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  leftOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rightOption: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  league: z.union([ z.lazy(() => LeagueSchema),z.lazy(() => EnumLeagueFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutPicksInputSchema: z.ZodType<Prisma.UserUpsertWithoutPicksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPicksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPicksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPicksInputSchema),z.lazy(() => UserUncheckedCreateWithoutPicksInputSchema) ]),
}).strict();

export const UserUpdateWithoutPicksInputSchema: z.ZodType<Prisma.UserUpdateWithoutPicksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  streaks: z.lazy(() => StreakUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPicksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPicksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  streaks: z.lazy(() => StreakUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutStreaksInputSchema: z.ZodType<Prisma.UserCreateWithoutStreaksInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  currentStreakId: z.string(),
  isPro: z.boolean().optional(),
  picks: z.lazy(() => PickCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutStreaksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutStreaksInput> = z.object({
  id: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  currentStreakId: z.string(),
  isPro: z.boolean().optional(),
  picks: z.lazy(() => PickUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutStreaksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutStreaksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutStreaksInputSchema),z.lazy(() => UserUncheckedCreateWithoutStreaksInputSchema) ]),
}).strict();

export const UserUpsertWithoutStreaksInputSchema: z.ZodType<Prisma.UserUpsertWithoutStreaksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutStreaksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutStreaksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutStreaksInputSchema),z.lazy(() => UserUncheckedCreateWithoutStreaksInputSchema) ]),
}).strict();

export const UserUpdateWithoutStreaksInputSchema: z.ZodType<Prisma.UserUpdateWithoutStreaksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  picks: z.lazy(() => PickUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutStreaksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutStreaksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  currentStreakId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPro: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  picks: z.lazy(() => PickUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PickCreateWithoutUserInputSchema: z.ZodType<Prisma.PickCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutPicksInputSchema)
}).strict();

export const PickUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PickUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  eventId: z.string(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PickCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PickCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PickWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PickCreateWithoutUserInputSchema),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PickCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PickCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PickCreateManyUserInputSchema),z.lazy(() => PickCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StreakCreateWithoutUserInputSchema: z.ZodType<Prisma.StreakCreateWithoutUserInput> = z.object({
  id: z.string(),
  started: z.coerce.date().optional(),
  ended: z.coerce.date(),
  updated: z.coerce.date().optional(),
  count: z.number().optional(),
  type: z.lazy(() => StreakTypeSchema)
}).strict();

export const StreakUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.StreakUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  started: z.coerce.date().optional(),
  ended: z.coerce.date(),
  updated: z.coerce.date().optional(),
  count: z.number().optional(),
  type: z.lazy(() => StreakTypeSchema)
}).strict();

export const StreakCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.StreakCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const StreakCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.StreakCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StreakCreateManyUserInputSchema),z.lazy(() => StreakCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PickUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PickUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PickWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PickUpdateWithoutUserInputSchema),z.lazy(() => PickUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PickCreateWithoutUserInputSchema),z.lazy(() => PickUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PickUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PickUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PickWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PickUpdateWithoutUserInputSchema),z.lazy(() => PickUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PickUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PickUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PickScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PickUpdateManyMutationInputSchema),z.lazy(() => PickUncheckedUpdateManyWithoutPicksInputSchema) ]),
}).strict();

export const StreakUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StreakUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StreakUpdateWithoutUserInputSchema),z.lazy(() => StreakUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => StreakCreateWithoutUserInputSchema),z.lazy(() => StreakUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const StreakUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.StreakUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => StreakWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StreakUpdateWithoutUserInputSchema),z.lazy(() => StreakUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const StreakUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.StreakUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => StreakScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StreakUpdateManyMutationInputSchema),z.lazy(() => StreakUncheckedUpdateManyWithoutStreaksInputSchema) ]),
}).strict();

export const StreakScalarWhereInputSchema: z.ZodType<Prisma.StreakScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StreakScalarWhereInputSchema),z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StreakScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StreakScalarWhereInputSchema),z.lazy(() => StreakScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  started: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ended: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  count: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => EnumStreakTypeFilterSchema),z.lazy(() => StreakTypeSchema) ]).optional(),
}).strict();

export const PickCreateManyEventInputSchema: z.ZodType<Prisma.PickCreateManyEventInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PickUpdateWithoutEventInputSchema: z.ZodType<Prisma.PickUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutPicksNestedInputSchema).optional()
}).strict();

export const PickUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.PickUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PickUncheckedUpdateManyWithoutPicksInputSchema: z.ZodType<Prisma.PickUncheckedUpdateManyWithoutPicksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PickCreateManyUserInputSchema: z.ZodType<Prisma.PickCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  eventId: z.string(),
  option: z.lazy(() => PickTypeSchema).optional(),
  status: z.lazy(() => StatusSchema).optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const StreakCreateManyUserInputSchema: z.ZodType<Prisma.StreakCreateManyUserInput> = z.object({
  id: z.string(),
  started: z.coerce.date().optional(),
  ended: z.coerce.date(),
  updated: z.coerce.date().optional(),
  count: z.number().int().optional(),
  type: z.lazy(() => StreakTypeSchema)
}).strict();

export const PickUpdateWithoutUserInputSchema: z.ZodType<Prisma.PickUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutPicksNestedInputSchema).optional()
}).strict();

export const PickUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PickUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  option: z.union([ z.lazy(() => PickTypeSchema),z.lazy(() => EnumPickTypeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => StatusSchema),z.lazy(() => EnumStatusFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreakUpdateWithoutUserInputSchema: z.ZodType<Prisma.StreakUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => EnumStreakTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreakUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => EnumStreakTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StreakUncheckedUpdateManyWithoutStreaksInputSchema: z.ZodType<Prisma.StreakUncheckedUpdateManyWithoutStreaksInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  started: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ended: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => StreakTypeSchema),z.lazy(() => EnumStreakTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: EventScalarFieldEnumSchema.array().optional(),
}).strict()

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: EventScalarFieldEnumSchema.array().optional(),
}).strict()

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: EventScalarFieldEnumSchema.array().optional(),
}).strict()

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict()

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict()

export const PickFindFirstArgsSchema: z.ZodType<Prisma.PickFindFirstArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  where: PickWhereInputSchema.optional(),
  orderBy: z.union([ PickOrderByWithRelationInputSchema.array(),PickOrderByWithRelationInputSchema ]).optional(),
  cursor: PickWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PickScalarFieldEnumSchema.array().optional(),
}).strict()

export const PickFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PickFindFirstOrThrowArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  where: PickWhereInputSchema.optional(),
  orderBy: z.union([ PickOrderByWithRelationInputSchema.array(),PickOrderByWithRelationInputSchema ]).optional(),
  cursor: PickWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PickScalarFieldEnumSchema.array().optional(),
}).strict()

export const PickFindManyArgsSchema: z.ZodType<Prisma.PickFindManyArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  where: PickWhereInputSchema.optional(),
  orderBy: z.union([ PickOrderByWithRelationInputSchema.array(),PickOrderByWithRelationInputSchema ]).optional(),
  cursor: PickWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PickScalarFieldEnumSchema.array().optional(),
}).strict()

export const PickAggregateArgsSchema: z.ZodType<Prisma.PickAggregateArgs> = z.object({
  where: PickWhereInputSchema.optional(),
  orderBy: z.union([ PickOrderByWithRelationInputSchema.array(),PickOrderByWithRelationInputSchema ]).optional(),
  cursor: PickWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PickGroupByArgsSchema: z.ZodType<Prisma.PickGroupByArgs> = z.object({
  where: PickWhereInputSchema.optional(),
  orderBy: z.union([ PickOrderByWithAggregationInputSchema.array(),PickOrderByWithAggregationInputSchema ]).optional(),
  by: PickScalarFieldEnumSchema.array(),
  having: PickScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PickFindUniqueArgsSchema: z.ZodType<Prisma.PickFindUniqueArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  where: PickWhereUniqueInputSchema,
}).strict()

export const PickFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PickFindUniqueOrThrowArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  where: PickWhereUniqueInputSchema,
}).strict()

export const StreakFindFirstArgsSchema: z.ZodType<Prisma.StreakFindFirstArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereInputSchema.optional(),
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(),StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StreakScalarFieldEnumSchema.array().optional(),
}).strict()

export const StreakFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StreakFindFirstOrThrowArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereInputSchema.optional(),
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(),StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StreakScalarFieldEnumSchema.array().optional(),
}).strict()

export const StreakFindManyArgsSchema: z.ZodType<Prisma.StreakFindManyArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereInputSchema.optional(),
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(),StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: StreakScalarFieldEnumSchema.array().optional(),
}).strict()

export const StreakAggregateArgsSchema: z.ZodType<Prisma.StreakAggregateArgs> = z.object({
  where: StreakWhereInputSchema.optional(),
  orderBy: z.union([ StreakOrderByWithRelationInputSchema.array(),StreakOrderByWithRelationInputSchema ]).optional(),
  cursor: StreakWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StreakGroupByArgsSchema: z.ZodType<Prisma.StreakGroupByArgs> = z.object({
  where: StreakWhereInputSchema.optional(),
  orderBy: z.union([ StreakOrderByWithAggregationInputSchema.array(),StreakOrderByWithAggregationInputSchema ]).optional(),
  by: StreakScalarFieldEnumSchema.array(),
  having: StreakScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const StreakFindUniqueArgsSchema: z.ZodType<Prisma.StreakFindUniqueArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema,
}).strict()

export const StreakFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StreakFindUniqueOrThrowArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema,
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict()

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict()

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict()

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict()

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
}).strict()

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
}).strict()

export const PickCreateArgsSchema: z.ZodType<Prisma.PickCreateArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  data: z.union([ PickCreateInputSchema,PickUncheckedCreateInputSchema ]),
}).strict()

export const PickUpsertArgsSchema: z.ZodType<Prisma.PickUpsertArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  where: PickWhereUniqueInputSchema,
  create: z.union([ PickCreateInputSchema,PickUncheckedCreateInputSchema ]),
  update: z.union([ PickUpdateInputSchema,PickUncheckedUpdateInputSchema ]),
}).strict()

export const PickCreateManyArgsSchema: z.ZodType<Prisma.PickCreateManyArgs> = z.object({
  data: z.union([ PickCreateManyInputSchema,PickCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PickDeleteArgsSchema: z.ZodType<Prisma.PickDeleteArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  where: PickWhereUniqueInputSchema,
}).strict()

export const PickUpdateArgsSchema: z.ZodType<Prisma.PickUpdateArgs> = z.object({
  select: PickSelectSchema.optional(),
  include: PickIncludeSchema.optional(),
  data: z.union([ PickUpdateInputSchema,PickUncheckedUpdateInputSchema ]),
  where: PickWhereUniqueInputSchema,
}).strict()

export const PickUpdateManyArgsSchema: z.ZodType<Prisma.PickUpdateManyArgs> = z.object({
  data: z.union([ PickUpdateManyMutationInputSchema,PickUncheckedUpdateManyInputSchema ]),
  where: PickWhereInputSchema.optional(),
}).strict()

export const PickDeleteManyArgsSchema: z.ZodType<Prisma.PickDeleteManyArgs> = z.object({
  where: PickWhereInputSchema.optional(),
}).strict()

export const StreakCreateArgsSchema: z.ZodType<Prisma.StreakCreateArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  data: z.union([ StreakCreateInputSchema,StreakUncheckedCreateInputSchema ]),
}).strict()

export const StreakUpsertArgsSchema: z.ZodType<Prisma.StreakUpsertArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema,
  create: z.union([ StreakCreateInputSchema,StreakUncheckedCreateInputSchema ]),
  update: z.union([ StreakUpdateInputSchema,StreakUncheckedUpdateInputSchema ]),
}).strict()

export const StreakCreateManyArgsSchema: z.ZodType<Prisma.StreakCreateManyArgs> = z.object({
  data: z.union([ StreakCreateManyInputSchema,StreakCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const StreakDeleteArgsSchema: z.ZodType<Prisma.StreakDeleteArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  where: StreakWhereUniqueInputSchema,
}).strict()

export const StreakUpdateArgsSchema: z.ZodType<Prisma.StreakUpdateArgs> = z.object({
  select: StreakSelectSchema.optional(),
  include: StreakIncludeSchema.optional(),
  data: z.union([ StreakUpdateInputSchema,StreakUncheckedUpdateInputSchema ]),
  where: StreakWhereUniqueInputSchema,
}).strict()

export const StreakUpdateManyArgsSchema: z.ZodType<Prisma.StreakUpdateManyArgs> = z.object({
  data: z.union([ StreakUpdateManyMutationInputSchema,StreakUncheckedUpdateManyInputSchema ]),
  where: StreakWhereInputSchema.optional(),
}).strict()

export const StreakDeleteManyArgsSchema: z.ZodType<Prisma.StreakDeleteManyArgs> = z.object({
  where: StreakWhereInputSchema.optional(),
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()