const String = [
  "contains",
  "endsWith",
  "equals",
  "gt",
  "gte",
//   "in",
  "lt",
  "lte",
  //   "not",
//   "notIn",
  "startsWith",
];

const Date = [
  "equals", // InputMaybe<Scalars['DateTime']>;
  "gt", // InputMaybe<Scalars['DateTime']>;
  "gte", // InputMaybe<Scalars['DateTime']>;
  //   "in", // InputMaybe<Array<Scalars['DateTime']>>;
  "lt", // InputMaybe<Scalars['DateTime']>;
  "lte", // InputMaybe<Scalars['DateTime']>;
  //   "not", // InputMaybe<NestedDateTimeFilter>;
  //   "notIn", // InputMaybe<Array<Scalars['DateTime']>>;
];

const Int = [
  "equals", // ?: InputMaybe<Scalars['Int']>;
  "gt", // ?: InputMaybe<Scalars['Int']>;
  "gte", // ?: InputMaybe<Scalars['Int']>;
//   "in", // ?: InputMaybe<Array<Scalars['Int']>>;
  "lt", // ?: InputMaybe<Scalars['Int']>;
  "lte", // ?: InputMaybe<Scalars['Int']>;
//   "not", // ?: InputMaybe<NestedIntFilter>;
//   "notIn", // ?: InputMaybe<Array<Scalars['Int']>>;
];

const Float = [
  "equals", // ?: InputMaybe<Scalars['Float']>;
  "gt", // ?: InputMaybe<Scalars['Float']>;
  "gte", // ?: InputMaybe<Scalars['Float']>;
//   "in", // ?: InputMaybe<Array<Scalars['Float']>>;
  "lt", // ?: InputMaybe<Scalars['Float']>;
  "lte", // ?: InputMaybe<Scalars['Float']>;
//   "not", // ?: InputMaybe<NestedFloatFilter>;
//   "notIn", // ?: InputMaybe<Array<Scalars['Float']>>;
];

const DateTime = [
  "equals", // ?: InputMaybe<Scalars['DateTime']>;
  "gt", // ?: InputMaybe<Scalars['DateTime']>;
  "gte", // ?: InputMaybe<Scalars['DateTime']>;
//   "in", // ?: InputMaybe<Array<Scalars['DateTime']>>;
  "lt", // ?: InputMaybe<Scalars['DateTime']>;
  "lte", // ?: InputMaybe<Scalars['DateTime']>;
//   "not", // ?: InputMaybe<NestedDateTimeFilter>;
//   "notIn", // ?: InputMaybe<Array<Scalars['DateTime']>>;
];

export const selectOptions: Record<string, string[]> = {
  String,
  Date,
  Int,
  Float,
  DateTime,
};
