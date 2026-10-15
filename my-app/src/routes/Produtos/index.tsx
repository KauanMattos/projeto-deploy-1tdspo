import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link, useNavigate } from "react-router";

export default function Produtos() {
  document.title = "Produtos";

  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  useEffect(() => {
    const carregaProdutos = async () => {
      try {
        const resposta = await fetch("http://localhost:3001/produtos");

        if (!resposta.ok) {
          throw new Error(
            `Erro na listagem de produtos: ${resposta.status} ${resposta.statusText}`,
          );
        }

        const data: TipoProduto[] = await resposta.json();
        console.log(data);
        setProdutos(data);
      } catch (error) {
        console.error(error);
      }
    };

    carregaProdutos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/produtos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `A exclusão falhou: ${response.status} ${response.statusText}`,
        );
      }

      alert("O produto foi excluído com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main style={{ padding: "20px" }}>
      <h2>Produtos</h2>

    

      <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: '#ffffff' }}>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Avatar</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.preco}</td>
              <td>{p.estoque}</td>
              <td><img src={p.avatar} alt={p.nome} width={60} height={60} style={{ objectFit: 'cover' }} /></td>
              <td>
                <Link to={`/editar-produtos/${p.id}`}>Editar</Link> | <Link to="#" onClick={() => handleDelete(p.id.toString())}>Excluir</Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Quantidade de produtos - {produtos.length}</td>
          </tr>
        </tfoot>
      </table>
    </main>
  );
}