import { IServiceOptions } from '@business/dtos/serviceOptions'
import { IWhere } from '@business/repositories/where'
import { Op, FindOptions } from 'sequelize'

interface IInputFindAllOptions<E>
  extends IServiceOptions<keyof E, string | number> {
  whereAnd?: IWhere<string, unknown>[]
  whereOr?: IWhere<string, unknown>[]
}

interface IInputFindByOptions<E>
  extends IServiceOptions<keyof E, string | number> {
  where?: IWhere<string, unknown>[]
}

export const createFindByProps = <E>(
  props: IInputFindByOptions<E>
): FindOptions => {
  const findAllProps: FindOptions = {
    where: {},
  }

  if (props.where) {
    findAllProps.where = {
      [Op.and]: [
        ...props.where.map((where) => ({
          [where.column]: where.value,
        })),
      ],
    }
  }

  return findAllProps
}

export const createFindAllProps = <E>(
  props: IInputFindAllOptions<E>
): FindOptions => {
  const findAllProps: FindOptions = {
    limit: props.pagination && props.pagination.count,
    offset:
      props.pagination &&
      Math.abs(props.pagination.count * props.pagination.page),
    where: {},
  }

  if (props.whereAnd) {
    findAllProps.where = {
      [Op.and]: [
        ...props.whereAnd.map((where) => ({
          [where.column]: where.value,
        })),
      ],
    }
  }

  if (props.whereOr) {
    findAllProps.where = {
      [Op.and]: [
        ...props.whereOr.map((where) => ({
          [where.column]: where.value,
        })),
      ],
    }
  }

  if (props.filters.contains && props.filters.contains.length > 0) {
    const filteredContains = props.filters.contains.filter(
      (contain) => contain.value
    )

    filteredContains.forEach(({ column, value }) => {
      findAllProps.where[column as string] = {
        [Op.substring]: value,
      }
    })
  }

  if (props.filters.containsLike && props.filters.containsLike.length > 0) {
    const filteredContains = props.filters.containsLike.filter(
      (contain) => contain.value
    )

    filteredContains.forEach(({ column, value }) => {
      findAllProps.where[column as string] = {
        [Op.substring]: value,
      }
    })
  }

  return findAllProps
}
