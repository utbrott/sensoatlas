import Latex from 'react-latex'
type TableHeaderProps = {
  label: string
  unit?: string
}

type TableDataProps = (string | number)[]

export interface TableProps {
  headers: TableHeaderProps[]
  data: TableDataProps[]
}

export const useParseTable = ({ headers, data }: TableProps) => {
  const headersList = headers.map((header, index) => {
    return (
      <th
        key={index}
        className='flex w-full flex-col justify-center border-x p-2 font-medium dark:border-gray-700/70 dark:text-gray-200'
      >
        <span>{header.label}</span>
        <span>{header.unit && <Latex>{header.unit}</Latex>}</span>
      </th>
    )
  })

  const body = data.map((row, index) => {
    const bodyItemType = (item: string | number) => {
      return typeof item === 'number' ? 'text-right' : 'text-left'
    }

    return (
      <tr key={index} className='flex w-full dark:bg-gray-700/20'>
        {row.map((item, index) => {
          return (
            <td
              key={index}
              className={`w-full p-2 ${bodyItemType(
                item
              )} border dark:border-gray-700/70`}
            >
              {item}
            </td>
          )
        })}
      </tr>
    )
  })

  return (
    <table className='w-full table-auto border-separate border-spacing-0 rounded-md border dark:border-gray-700/70'>
      <thead>
        <tr className='flex w-full dark:bg-gray-700/40'>{headersList}</tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  )
}
