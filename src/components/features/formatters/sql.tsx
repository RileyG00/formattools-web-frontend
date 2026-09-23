"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { format, KeywordCase } from "sql-formatter";
import { formatters_Sql } from "@/config/features";
import SQLLanguage from "@/types/sqlLanguage";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ToolPage from "../toolPage";
import ToolOptions from "../toolOptions";
import ToolPanels, { toolPanelClassName } from "../toolPanels";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import NumberOption from "../numberOption";
import OptionSelect, { SelectOption } from "../optionSelect";

//----------------------------------------------------------------------------------------
//Options
//----------------------------------------------------------------------------------------
type SqlIndentation = "2" | "4" | "tab";
type Casing = "preserve" | "upper" | "lower";

const indentationOptions: readonly SelectOption<SqlIndentation>[] = [
	{ id: "2", label: "2 spaces" },
	{ id: "4", label: "4 spaces" },
	{ id: "tab", label: "Tab" },
];

const casingOptions: readonly SelectOption<Casing>[] = [
	{ id: "preserve", label: "Preserve" },
	{ id: "upper", label: "Uppercase" },
	{ id: "lower", label: "Lowercase" },
];

const languageOptions: readonly SelectOption<SQLLanguage>[] = [
	{ id: "bigquery", label: "BigQuery" },
	{ id: "db2", label: "DB2" },
	{ id: "db2i", label: "DB2 i" },
	{ id: "duckdb", label: "DuckDB" },
	{ id: "hive", label: "Hive" },
	{ id: "mariadb", label: "MariaDB" },
	{ id: "mysql", label: "MySQL" },
	{ id: "n1ql", label: "N1QL" },
	{ id: "plsql", label: "PL/SQL" },
	{ id: "postgresql", label: "PostgreSQL" },
	{ id: "redshift", label: "Redshift" },
	{ id: "singlestoredb", label: "SingleStoreDB" },
	{ id: "snowflake", label: "Snowflake" },
	{ id: "spark", label: "Spark" },
	{ id: "sql", label: "SQL" },
	{ id: "sqlite", label: "SQLite" },
	{ id: "tidb", label: "TiDB" },
	{ id: "trino", label: "Trino" },
	{ id: "tsql", label: "T-SQL" },
];

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const SqlFormatter: React.FC = () => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [indentation, setIndentation] = useState<SqlIndentation>("tab");
	const [keywordCasing, setKeywordCasing] = useState<Casing>("preserve");
	const [language, setLanguage] = useState<SQLLanguage>("tsql");
	const [linesBetweenQueries, setLinesBetweenQueries] = useState<number>(2);
	const [identifierCasing, setIdentifierCasing] =
		useState<Casing>("preserve");
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const copy = useCopyToClipboard();

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	const handleFormat = (raw: string): void => {
		if (!raw) return;
		if (error) setError(null);

		try {
			const formatted: string = format(raw, {
				language: language,
				tabWidth: !isNaN(parseInt(indentation))
					? parseInt(indentation)
					: 1, // If not a NaN, it means the user is not using the tab option,
				useTabs: indentation === "tab",
				keywordCase: keywordCasing as KeywordCase,
				functionCase: keywordCasing as KeywordCase,
				identifierCase: identifierCasing as KeywordCase,
				linesBetweenQueries: linesBetweenQueries,
			});

			setOutput(formatted);
		} catch (error) {
			const err = error as unknown as Error;

			setOutput("");
			setError(err.message);
		}
	};

	const handleCopyOutput = (): Promise<void> => copy(output);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<ToolPage item={formatters_Sql}>
			<ToolOptions
				error={error}
				actions={
					<>
						<Button
							variant="tertiary"
							onPress={() => {
								setInput("");
								setOutput("");
								setError(null);
							}}
						>
							Clear Input
						</Button>
						<Button onPress={() => handleFormat(input)}>
							Format SQL
						</Button>
					</>
				}
			>
				<OptionSelect
					label="Language"
					options={languageOptions}
					value={language}
					onChange={setLanguage}
				/>
				<OptionSelect
					label="Indentation"
					options={indentationOptions}
					value={indentation}
					onChange={setIndentation}
				/>
				<OptionSelect
					label="Keyword Casing"
					options={casingOptions}
					value={keywordCasing}
					onChange={setKeywordCasing}
				/>
				<OptionSelect
					label="Identifier Casing"
					options={casingOptions}
					value={identifierCasing}
					onChange={setIdentifierCasing}
				/>
				<NumberOption
					label="Lines Between Queries"
					value={linesBetweenQueries}
					onChange={setLinesBetweenQueries}
					minValue={1}
					maxValue={10}
					description="Separate queries with semicolons."
				/>
			</ToolOptions>
			<ToolPanels>
				<ToolCard title="Input SQL" className={toolPanelClassName}>
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={`select * from Data.dbo.Formatters with (nolock)`}
					/>
				</ToolCard>
				<CodeOutputCard
					title="Output SQL"
					language="sql"
					output={output}
					onCopy={handleCopyOutput}
				/>
			</ToolPanels>
		</ToolPage>
	);
};

export default SqlFormatter;
