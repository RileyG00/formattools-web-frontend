import GriffinereCipher from "@/components/features/ciphers/griffinereCipher";
import Base64EncoderDecoder from "@/components/features/escapers/base64EncoderDecoder";
import JsonEscaper from "@/components/features/escapers/jsonEscaper";
import UrlEncoderDecoder from "@/components/features/escapers/urlEncoderDecoder";
import XmlEscaper from "@/components/features/escapers/xmlEscaper";
import HtmlFormatter from "@/components/features/formatters/htmlFormatter";
import JsonFormatter from "@/components/features/formatters/jsonFormatter";
import MarkdownFormatter from "@/components/features/formatters/markdownFormatter";
import SqlFormatter from "@/components/features/formatters/sqlFormatter";
import SqlToJiraTableFormatter from "@/components/features/formatters/sqlToJiraTableFormatter";
import StringFormatter from "@/components/features/formatters/stringFormatter";
import TabularToSqlInsertFormatter from "@/components/features/formatters/tabularToSqlInsertFormatter";
import XmlFormatter from "@/components/features/formatters/xmlFormatter";
import LoremIpsumGenerator from "@/components/features/generators/loremIpsumGenerator";
import NumberGenerator from "@/components/features/generators/numberGenerator";
import StringGenerator from "@/components/features/generators/stringGenerator";
import CoinTossRng from "@/components/features/rngs/coinTossRng";
import DiceRollRng from "@/components/features/rngs/diceRollRng";
import { featureRoutes, featureSubRoutes } from "@/config/site";
import {
	FeatureOptionItem,
	FeatureOptionItemKey,
	FeatureOptionKey,
	FeatureRoutePath,
	FeatureRouteSubPath,
} from "@/types/siteConfigs";
import {
	getFeatureOptionItemByKey,
	getFeatureOptionItemKey,
	getFeatureOptionKey,
} from "@/utils/configUtils";
import { ReactNode, useCallback } from "react";

export const useGetFeatureOptionItemByKey = (
	routeRootPath: FeatureRoutePath,
	routeSubPath: FeatureRouteSubPath,
) => {
	return useCallback((): ReactNode => {
		const optionKey: FeatureOptionKey = getFeatureOptionKey(routeRootPath);
		const optionItemKey: FeatureOptionItemKey = getFeatureOptionItemKey(
			routeRootPath,
			routeSubPath,
		);
		const optionItem: FeatureOptionItem = getFeatureOptionItemByKey(
			optionKey,
			optionItemKey,
		);

		// Ciphers
		if (routeRootPath === featureRoutes.ciphers) {
			if (routeSubPath === featureSubRoutes.cipher_griffinere) {
				return <GriffinereCipher optionItem={optionItem} />;
			} else {
				throw new Error("Invalid Feature Option Item path.");
			}
		}
		// Escapers and Encoders
		else if (routeRootPath === featureRoutes.escapers_encoders) {
			if (routeSubPath === featureSubRoutes.encoder_base64) {
				return <Base64EncoderDecoder optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.escaper_json) {
				return <JsonEscaper optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.encoder_url) {
				return <UrlEncoderDecoder optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.escaper_xml) {
				return <XmlEscaper optionItem={optionItem} />;
			} else {
				throw new Error("Invalid Feature Option Item path.");
			}
		}
		// Formatters
		else if (routeRootPath === featureRoutes.formatters) {
			if (routeSubPath === featureSubRoutes.formatter_html) {
				return <HtmlFormatter optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.formatter_json) {
				return <JsonFormatter optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.formatter_sql) {
				return <SqlFormatter optionItem={optionItem} />;
			} else if (
				routeSubPath === featureSubRoutes.formatter_tabularToTable
			) {
				return <SqlToJiraTableFormatter optionItem={optionItem} />;
			} else if (
				routeSubPath === featureSubRoutes.formatter_tabularToSqlInsert
			) {
				return <TabularToSqlInsertFormatter optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.formatter_xml) {
				return <XmlFormatter optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.formatter_string) {
				return <StringFormatter optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.formatter_markdown) {
				return <MarkdownFormatter optionItem={optionItem} />;
			} else {
				throw new Error("Invalid Feature Option Item path.");
			}
		}
		// Generators
		else if (routeRootPath === featureRoutes.generators) {
			if (routeSubPath === featureSubRoutes.generator_lorem) {
				return <LoremIpsumGenerator optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.generator_number) {
				return <NumberGenerator optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.generator_string) {
				return <StringGenerator optionItem={optionItem} />;
			} else {
				throw new Error("Invalid Feature Option Item path.");
			}
		}
		// RNGs
		else if (routeRootPath === featureRoutes.rngs) {
			if (routeSubPath === featureSubRoutes.rng_coinToss) {
				return <CoinTossRng optionItem={optionItem} />;
			} else if (routeSubPath === featureSubRoutes.rng_diceRoll) {
				return <DiceRollRng optionItem={optionItem} />;
			} else {
				throw new Error("Invalid Feature Option Item path.");
			}
		} else {
			throw new Error("Invalid Feature Option path");
		}
	}, [routeRootPath, routeSubPath]);
};
