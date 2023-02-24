import * as React from 'react';
import { DMMF } from '@prisma/generator-helper';
import Field from './Field';
import useGetSchema2 from '../../shared/data/useGetSchema2';
import { getModelFieldsOrder } from '../../Model/data/useGetModelItemsQuery/utils/getModelFieldsOrder';

type ModelFieldsProps = {
  model: DMMF.Model;
};

export default function ModelFields({ model }: ModelFieldsProps) {
  const schema = useGetSchema2();
  const customizations =
    'customizations' in schema ? schema.customizations : undefined;
  const { loading } = schema;

  if (loading) return <div>Loading...</div>;

  const sortedFields = getModelFieldsOrder(
    model.fields,
    customizations?.[model.name],
  );

  return (
    <div className="bg-white p-4 gap-4 flex flex-col">
      {sortedFields.map((field) => {
        return (
          <Field key={model.name + field.name} model={model} field={field} />
        );
      })}
    </div>
  );
}
