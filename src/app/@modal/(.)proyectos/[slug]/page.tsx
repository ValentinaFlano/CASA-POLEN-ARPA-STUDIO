import { notFound } from "next/navigation";
import { DetalleProyecto } from "@/components/proyectos/DetalleProyecto";
import { Modal } from "@/components/proyectos/Modal";
import { getProyecto } from "@/lib/content";

export default async function ProyectoModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proyecto = await getProyecto(slug);
  if (!proyecto) notFound();

  return (
    <Modal etiquetaId="titulo-proyecto">
      <DetalleProyecto proyecto={proyecto} enModal />
    </Modal>
  );
}
