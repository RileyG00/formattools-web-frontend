"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { format, KeywordCase } from "sql-formatter";
import { formatters_Sql } from "@/config/features";
import SQLLanguage from "@/types/sqlLanguage";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import FeatureOptionItemContainerLayout from "@/layouts/featureOptionItemContainerLayout";
import CopyButton from "@/components/common/copyButton";
import FeatureHeader from "../featureHeader";
import InputSpecsContainer from "../inputSpecsContainer";
import ToolCard from "../toolCard";
import CodeInput from "../codeInput";
import CodeOutputCard from "../codeOutputCard";
import ErrorAlert from "../errorAlert";
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
		<FeatureOptionItemContainerLayout>
			<FeatureHeader>{formatters_Sql.name}</FeatureHeader>
			<InputSpecsContainer>
				<ToolCard title="Input SQL" className="min-h-[200px] w-full">
					<CodeInput
						value={input}
						onChange={setInput}
						placeholder={`select * from Data.dbo.Formatters with (nolock)`}
					/>
				</ToolCard>
				<ToolCard
					title="Formatting Specifications"
					className="min-w-fit"
				>
					<div className="flex flex-row gap-4">
						<OptionSelect
							label="Indentation"
							options={indentationOptions}
							value={indentation}
							onChange={setIndentation}
							className="min-w-40"
						/>
						<OptionSelect
							label="Language"
							options={languageOptions}
							value={language}
							onChange={setLanguage}
							className="min-w-40"
						/>
					</div>
					<div className="flex flex-row gap-4">
						<OptionSelect
							label="Keyword Casing"
							options={casingOptions}
							value={keywordCasing}
							onChange={setKeywordCasing}
							className="min-w-40"
						/>
						<OptionSelect
							label="Identifier Casing"
							options={casingOptions}
							value={identifierCasing}
							onChange={setIdentifierCasing}
							className="min-w-40"
						/>
					</div>
					<NumberOption
						hideStepper
						label="Lines Between Queries"
						value={linesBetweenQueries}
						onChange={setLinesBetweenQueries}
						minValue={1}
						maxValue={10}
						description="You must use semicolons to break queries up for this feature to apply."
					/>
					<div className="flex flex-row justify-end gap-2">
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
						<CopyButton
							isDisabled={!output}
							onPress={handleCopyOutput}
						/>
					</div>
					<ErrorAlert error={error} />
				</ToolCard>
			</InputSpecsContainer>
			<CodeOutputCard
				allowFullScreen
				title="Output SQL"
				language="sql"
				output={output}
				onCopy={handleCopyOutput}
			/>
		</FeatureOptionItemContainerLayout>
	);
};

export default SqlFormatter;
