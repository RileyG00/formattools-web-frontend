import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Textarea } from "@heroui/input";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FeatureHeader from "@/components/common/featureHeader";
import FeatureProps from "@/interfaces/featureProps";

//----------------------------------------------------------------------------------------
//Create Component
//----------------------------------------------------------------------------------------
const MarkdownFormatter: React.FC<FeatureProps> = ({ optionItem }) => {
	//------------------------------------------------------------------------------------
	//Variables
	//------------------------------------------------------------------------------------
	const [error, setError] = useState<string | null>(null);
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	//------------------------------------------------------------------------------------
	//Handle Formatting the Input String
	//------------------------------------------------------------------------------------
	useEffect(() => {
		console.log(input);
	}, [input]);

	//------------------------------------------------------------------------------------
	//Return
	//------------------------------------------------------------------------------------
	return (
		<div className="h-[800px] container flex flex-col w-full gap-4">
			<FeatureHeader>{optionItem.name}</FeatureHeader>
			<div className="flex flex-row gap-4 h-full">
				<Card className="w-full">
					<CardHeader>Input Markdown</CardHeader>
					<CardBody>
						<Textarea
							aria-label="Container for the raw text input"
							value={input}
							onValueChange={setInput}
						/>
					</CardBody>
				</Card>
				<Card className="w-full h-full">
					<CardHeader>Markdown Preview</CardHeader>
					<CardBody>
						<Markdown remarkPlugins={[remarkGfm]}>{input}</Markdown>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default MarkdownFormatter;
