export class GraphQLFormatter {
  public static prettify(query: string): string {
    const normalizedQuery = this.normalizeWhitespace(query);
    const formattedQuery = this.formatWithIndentation(normalizedQuery);
    const finalQuery = this.formatCommands(formattedQuery);
    return this.removeEmptyLines(finalQuery);
  }

  private static removeEmptyLines(str: string): string {
    return str
      .split('\n')
      .filter((line) => line.trim() !== '')
      .join('\n');
  }

  private static normalizeWhitespace(str: string): string {
    return str.replace(/\s+/g, ' ').trim();
  }

  private static formatWithIndentation(str: string): string {
    let indentLevel = 0;
    const indentSize = 2;
    let formattedString = '';
    const length = str.length;

    for (let i = 0; i < length; i++) {
      const char = str[i];

      if (char === '{') {
        indentLevel++;
        formattedString += ` {\n${' '.repeat(indentSize * indentLevel)}`;
      } else if (char === '}') {
        indentLevel--;
        formattedString += `\n${' '.repeat(indentSize * indentLevel)}}`;
      } else if (char === ' ' && (str[i + 1] === '{' || str[i + 1] === '}')) {
        formattedString += ' ';
      } else if (char === ' ' && str[i + 1] !== '{' && str[i + 1] !== '}') {
        if (i > 0 && str[i - 1] !== '\n') {
          formattedString += '\n' + ' '.repeat(indentSize * indentLevel);
        }
      } else {
        formattedString += char;
      }
    }

    return formattedString.trim();
  }

  private static formatCommands(str: string): string {
    return str
      .replace(/^\s*(query|mutation|fragment)\s+/gm, '$1 ')
      .replace(/\s*(query|mutation|fragment)\s/gm, ' $1 ');
  }
}
