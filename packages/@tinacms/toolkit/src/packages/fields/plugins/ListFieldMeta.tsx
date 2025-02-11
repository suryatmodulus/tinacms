/**

Copyright 2021 Forestry.io Holdings, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as React from 'react'
import { useEvent } from '../../react-core/use-cms-event'
import { FieldHoverEvent, FieldFocusEvent } from '../field-events'
import { Form } from '../../forms'
import { FieldDescription, FieldError, FieldWrapper } from './wrapFieldWithMeta'

interface FieldMetaProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  children: any
  actions?: any
  label?: string | boolean
  description?: string
  error?: string
  margin?: boolean
  index?: number
  tinaForm: Form
}

export const ListFieldMeta = ({
  name,
  label,
  description,
  error,
  margin = true,
  children,
  actions,
  index,
  tinaForm,
  ...props
}: FieldMetaProps) => {
  const { dispatch: setHoveredField } = useEvent<FieldHoverEvent>('field:hover')
  const { dispatch: setFocusedField } = useEvent<FieldFocusEvent>('field:focus')
  return (
    <FieldWrapper
      margin={margin}
      onMouseOver={() => setHoveredField({ id: tinaForm.id, fieldName: name })}
      onMouseOut={() => setHoveredField({ id: null, fieldName: null })}
      onClick={() => setFocusedField({ id: tinaForm.id, fieldName: name })}
      style={{ zIndex: index ? 1000 - index : undefined }}
      {...props}
    >
      <ListHeader>
        <ListMeta>
          {label !== false && <ListLabel>{label || name}</ListLabel>}
          {description && (
            <FieldDescription className="whitespace-nowrap text-ellipsis overflow-hidden">
              {description}
            </FieldDescription>
          )}
        </ListMeta>
        {actions && actions}
      </ListHeader>
      {children}
      {/*
      FIXME: when a object field has a sub-field with a validation (eg. required)
             AND the object field is not pristine (eg. you've touched other fields)
             the error will be an object (eg {mySubField: "required"}).
     */}
      {error && typeof error === 'string' && <FieldError>{error}</FieldError>}
    </FieldWrapper>
  )
}

export const ListHeader = ({ children }: { children?: any }) => {
  return (
    <span className="relative flex gap-2 w-full justify-between items-center mb-2">
      {children}
    </span>
  )
}

export const ListMeta = ({ children }: { children?: any }) => {
  return <div className="flex-1 truncate">{children}</div>
}

export const ListLabel = ({ children }: { children?: any }) => {
  return (
    <span
      className={`m-0 text-xs font-semibold flex-1 text-ellipsis overflow-hidden transition-all ease-out duration-100 text-left`}
    >
      {children}
    </span>
  )
}

export const ListPanel = ({ className = '', ...props }) => (
  <div
    className={`max-h-[initial] relative h-auto rounded-md shadow bg-gray-100 ${className}`}
    {...props}
  />
)

export const EmptyList = ({ message = 'There are no items' }) => (
  <div className="text-center bg-gray-100 text-gray-300 leading-[1.35] py-3 text-[15px] font-normal">
    {message}
  </div>
)
