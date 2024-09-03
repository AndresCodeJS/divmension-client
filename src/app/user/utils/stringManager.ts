export function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
        return text;
    }
    
    // Usamos slice en lugar de substr
    let truncated = text.slice(0, maxLength);
    let lastSpaceIndex = truncated.lastIndexOf(' ');
    
    // Si encontramos un espacio, cortamos ahí. Si no, cortamos en maxLength
    if (lastSpaceIndex > 0) {
        truncated = truncated.slice(0, lastSpaceIndex);
    }
    
    return mostrarTexto(truncated) + '...';
}

//Usado para mostrar los saltos de linea en el texto
export function mostrarTexto(texto: string) {
    return texto
      .replace(/\n/g, '<br>')
      .replace(/  /g, '&nbsp;&nbsp;');
  }