import React from "react";

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER',
  'ON', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'AS', 'ORDER', 'BY',
  'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES',
  'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP',
  'INDEX', 'DISTINCT', 'BETWEEN', 'LIKE', 'EXISTS', 'CASE', 'WHEN',
  'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'UNION', 'ALL', 'WITH',
  'INTERVAL', 'MONTH', 'YEAR', 'DAY',
];

const SQL_FUNCTIONS = [
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DATE_SUB', 'CURDATE',
  'NOW', 'COALESCE', 'IFNULL', 'CONCAT', 'UPPER', 'LOWER',
  'TRIM', 'SUBSTRING', 'LENGTH', 'ROUND', 'CAST', 'CONVERT',
];

export const highlightSql = (sql: string): React.ReactNode[] => {
  const tokens: React.ReactNode[] = [];
  const regex = /('(?:[^'\\]|\\.)*')|(\b\d+\b)|(--[^\n]*)|(\b\w+\b)|([^\w\s]+|\s+)/g;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(sql)) !== null) {
    const [full, str, num, comment, word] = match;
    key++;

    if (str) {
      tokens.push(<span key={key} className="text-sql-string">{full}</span>);
    } else if (comment) {
      tokens.push(<span key={key} className="text-sql-comment italic">{full}</span>);
    } else if (num) {
      tokens.push(<span key={key} className="text-sql-number">{full}</span>);
    } else if (word) {
      const upper = word.toUpperCase();
      if (SQL_KEYWORDS.includes(upper)) {
        tokens.push(<span key={key} className="text-sql-keyword font-semibold">{full}</span>);
      } else if (SQL_FUNCTIONS.includes(upper)) {
        tokens.push(<span key={key} className="text-sql-function">{full}</span>);
      } else {
        tokens.push(<span key={key} className="text-foreground">{full}</span>);
      }
    } else {
      tokens.push(<span key={key}>{full}</span>);
    }
  }

  return tokens;
};

interface SqlHighlighterProps {
  sql: string;
}

const SqlHighlighter: React.FC<SqlHighlighterProps> = ({ sql }) => {
  return (
    <pre className="font-mono text-sm leading-relaxed overflow-x-auto p-4 rounded-lg bg-muted/50 whitespace-pre-wrap break-words">
      <code>{highlightSql(sql)}</code>
    </pre>
  );
};

export default SqlHighlighter;
