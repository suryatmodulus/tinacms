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
import { Field, Form } from '../../forms'
import { FieldsBuilder } from '../../form-builder'
import { IconButton } from '../../styles'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { AddIcon } from '../../icons'
import {
  DragHandle,
  ItemClickTarget,
  ItemDeleteButton,
  ItemHeader,
} from './GroupListFieldPlugin'
import { EmptyList, ListFieldMeta, ListPanel } from './ListFieldMeta'

type DefaultItem = string | number | (() => string | number)

interface ListFieldDefinititon extends Field {
  component: 'list'
  defaultItem?: DefaultItem
  field: {
    component: 'text' | 'textarea' | 'number' | 'select'
  }

  type?: string
  list?: boolean
  parentTypename?: string
  /**
   * An optional function which generates `props` for
   * this items's `li`.
   */
  itemProps?: (_item: object) => {
    /**
     * The `key` property used to optimize the rendering of lists.
     *
     * If rendering is causing problems, use `defaultItem` to
     * generate a unique key for the item.
     *
     * Reference:
     * * https://reactjs.org/docs/lists-and-keys.html
     */
    key?: string
  }
}

interface ListProps {
  input: any
  meta: any
  field: ListFieldDefinititon
  form: any
  tinaForm: Form
  index?: number
}

const List = ({ tinaForm, form, field, input, meta, index }: ListProps) => {
  const addItem = React.useCallback(() => {
    let newItem: DefaultItem = ''
    if (typeof field.defaultItem === 'function') {
      newItem = field.defaultItem()
    } else if (typeof field.defaultItem !== 'undefined') {
      newItem = field.defaultItem
    }
    form.mutators.insert(field.name, 0, newItem)
  }, [form, field])

  const items = input.value || []
  const itemProps = React.useCallback(
    (item: object) => {
      if (!field.itemProps) return {}
      return field.itemProps(item)
    },
    [field.itemProps]
  )

  // @ts-ignore
  const isMax = items.length >= (field.max || Infinity)
  // @ts-ignore
  const isMin = items.length <= (field.min || 0)
  // @ts-ignore
  const fixedLength = field.min === field.max

  return (
    <ListFieldMeta
      name={input.name}
      label={field.label}
      description={field.description}
      error={meta.error}
      index={index}
      tinaForm={tinaForm}
      actions={
        (!fixedLength || (fixedLength && !isMax)) && (
          <IconButton onClick={addItem} variant="primary" size="small">
            <AddIcon className="w-5/6 h-auto" />
          </IconButton>
        )
      }
    >
      <ListPanel>
        <div>
          <Droppable droppableId={field.name} type={field.name}>
            {(provider) => (
              <div ref={provider.innerRef}>
                {items.length === 0 && <EmptyList />}
                {items.map((item: any, index: any) => (
                  <Item
                    // NOTE: Supressing warnings, but not helping with render perf
                    key={index}
                    tinaForm={tinaForm}
                    field={field}
                    item={item}
                    index={index}
                    isMin={isMin}
                    fixedLength={fixedLength}
                    {...itemProps(item)}
                  />
                ))}
                {provider.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </ListPanel>
    </ListFieldMeta>
  )
}

interface ItemProps {
  tinaForm: Form
  field: ListFieldDefinititon
  index: number
  item: any
  label?: string
  isMin?: boolean
  fixedLength?: boolean
}

const Item = ({
  tinaForm,
  field,
  index,
  item,
  label,
  isMin,
  fixedLength,
  ...p
}: ItemProps) => {
  const removeItem = React.useCallback(() => {
    tinaForm.mutators.remove(field.name, index)
  }, [tinaForm, field, index])
  const fields = [
    {
      type: field.type,
      list: field.list,
      parentTypename: field.parentTypename,
      ...field.field,
      label: false,
      name: field.name + '.' + index,
    },
  ]

  return (
    <Draggable
      type={field.name}
      draggableId={`${field.name}.${index}`}
      index={index}
    >
      {(provider, snapshot) => (
        <ItemHeader provider={provider} isDragging={snapshot.isDragging} {...p}>
          <DragHandle isDragging={snapshot.isDragging} />
          <ItemClickTarget>
            <FieldsBuilder padding={false} form={tinaForm} fields={fields} />
          </ItemClickTarget>
          {(!fixedLength || (fixedLength && !isMin)) && (
            <ItemDeleteButton disabled={isMin} onClick={removeItem} />
          )}
        </ItemHeader>
      )}
    </Draggable>
  )
}

export const ListField = List

export const ListFieldPlugin = {
  name: 'list',
  Component: ListField,
  validate(value: any, values: any, meta: any, field: any) {
    if (field.required && !value) return 'Required'
  },
}
