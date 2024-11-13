"use client";
import Loading from "@/components/Loading";
import { ContextGlobal } from "@/context/GlobalContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Inicio() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [dadosVideo, setDadosVideo] = useState({});
  const [openCloseModalDadosCliente, setOpenCloseModalDadosCliente] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { token, BASE_URL } = useContext(ContextGlobal);

  useEffect(() => {
    handleProdutos();
  }, []);

  const handleProdutos = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          "user-token": `${token}`,
        },
      };

      const response = await axios.get(
        `${BASE_URL}/checkout/95BD9233-8FDC-48AD-B4C5-E5BAF7578C15`,
        requestOptions
      );
      const videoUrl = response.data.object[0].video_url;
      const videoId = videoUrl.split("/").pop().split("?")[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      setDadosVideo({
        video_headline: response.data.object[0].video_headline,
        video_sub_headline: response.data.object[0].video_sub_headline,
        video_url: embedUrl,
      });
      console.log(response.data);
      setProdutos(response.data.object[0].products);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleProdutoClicado = (item) => {
    setProdutoSelecionado(item);
    setOpenCloseModalDadosCliente(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("product_id", produtoSelecionado.product_id);
    const formValues = Object.fromEntries(formData);
    console.log(formValues);

    try {
      setLoading(true);
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          "user-token": `${token}`,
        },
      };

      const response = await axios.post(
        `${BASE_URL}/buy/${produtoSelecionado.product_id}`,
        formValues,
        requestOptions
      );
      console.log(response.data);
      setOpenCloseModalDadosCliente(false);
      router.push("/pages/obrigado");
    } catch (error) {
      console.log(error.response.data);
    }
  };
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Vídeo do YouTube */}
        {dadosVideo.video_url && (
          <div className="mb-8">
            <h2 className="text-lg sm:text-2xl text-center font-semibold text-gray-900 dark:text-white">
              {dadosVideo.video_headline}
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-4 text-center mt-4 text-gray-700 dark:text-gray-300">
              {dadosVideo.video_sub_headline}
            </p>

            <iframe
              width="100%"
              height="450"
              src={dadosVideo.video_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg border border-gray-200"
            ></iframe>
          </div>
        )}

        {/* Título da seção de produtos */}
        <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <div>
            <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Produtos</h2>
          </div>
        </div>

        {/* Lista de produtos */}
        <div className="mb-3 grid gap-3 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
          {produtos?.map((item) => (
            <div key={item.product_id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="h-56 w-full">
                <a>
                  <img className="mx-auto h-full dark:hidden" src={item.image_url} alt="" />
                  <img className="mx-auto hidden h-full dark:block" src={item.image_url} alt="" />
                </a>
              </div>

              <div className="pt-6">
                <div className="mb-4">
                  <span className="me-2 rounded bg-primary-100 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">R${parseFloat(item.discount).toFixed(2)} de desconto</span>
                </div>

                <a className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{item.name}</a>

                <ul className="mt-2 flex items-center gap-4">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.freight}</p>
                  </li>

                  {item.best_choice &&
                    <li className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                      </svg>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Melhor escolha</p>
                    </li>
                  }
                </ul>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">R${item.price}</p>

                  <button
                    onClick={() => handleProdutoClicado(item)}
                    type="button"
                    style={{
                      backgroundColor: "#1d4ed8",
                      color: "white",
                      padding: "10px 20px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      minWidth: 150
                    }}
                    className="text-center text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal */}
        {openCloseModalDadosCliente && (
          <div className="fixed inset-0 p-1 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-[500px]">
              <h2 className="text-xl font-semibold mb-4">Dados do comprador</h2>
              <form onSubmit={handleSubmitForm}>
                <div className="mb-4">
                  <input type="text" name="name" placeholder="Nome" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                  <input type="email" name="email" placeholder="Email" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                  <input type="tel" name="phone_number" placeholder="Número de telefone" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                  <input type="number" name="street_number" placeholder="Número da rua" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                  <input type="text" name="street" placeholder="Rua" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                  <input type="text" name="district" placeholder="Bairro" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                  <input type="text" name="city" placeholder="Cidade" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                  <input type="text" name="state" placeholder="Estado" required className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setOpenCloseModalDadosCliente(false)}
                    className="px-4 py-2 w-full bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2  w-full bg-blue-600 text-white rounded hover:bg-blue-800"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
