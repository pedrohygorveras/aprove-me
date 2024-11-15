export function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "Requisição inválida: Verifique os dados enviados.";
    case 401:
      return "Não autorizado: Credenciais inválidas.";
    case 403:
      return "Proibido: Você não tem permissão para acessar este recurso.";
    case 404:
      return "Não encontrado: O recurso solicitado não foi encontrado.";
    case 408:
      return "Tempo de solicitação esgotado: O servidor demorou muito para responder.";
    case 409:
      return "Conflito: Houve um conflito na requisição.";
    case 410:
      return "Indisponível: Este recurso não está mais disponível.";
    case 422:
      return "Entidade não processável: Os dados enviados estão em um formato inválido.";
    case 429:
      return "Muitas requisições: Você fez muitas requisições em pouco tempo.";
    case 500:
      return "Erro interno do servidor: Ocorreu um problema no servidor.";
    case 502:
      return "Bad Gateway: O servidor recebeu uma resposta inválida.";
    case 503:
      return "Serviço indisponível: O servidor está temporariamente indisponível.";
    case 504:
      return "Tempo limite do gateway: O servidor não conseguiu uma resposta a tempo.";

    default:
      return `Erro desconhecido: Código de status ${status} não tratado.`;
  }
}
