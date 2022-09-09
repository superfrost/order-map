import {useTable, useExpanded, Column} from 'react-table';
import './TasksScheduleTable.less';

interface ITasksScheduleTableProps<D extends {id: string, children?: D[]}> {
	columns: Array<Column<D>>;
	data: D[];
}

export const TasksScheduleTable = <D extends {id: string, children?: D[]}>(props: ITasksScheduleTableProps<D>) => {
	const {columns, data} = props;
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow
	} = useTable<D>(
		{
			columns,
			data
		},
		useExpanded
	);

	return (
		<div className="tasks-shedule-table-wrap">
			<table className="tasks-shedule-table" {...getTableProps()} >
				<thead className="tasks-shedule-table_head">
					{headerGroups.map(headerGroup => (
						<tr className="tasks-shedule-table_head-row" {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									className="tasks-shedule-table_head-row_cell"
									{...column.getHeaderProps()}
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="tasks-shedule-table_body" {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr className="tasks-shedule-table_body-row" {...row.getRowProps()}>
								{row.cells.map(cell => (
									<td
										className={cell.column?.className || 'tasks-shedule-table_body-row_cell'}
										{...cell.getCellProps()}
									>
										{cell.render('Cell')}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
