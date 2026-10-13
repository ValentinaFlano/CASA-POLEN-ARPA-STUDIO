import { Boton } from "@/components/ui/Boton";

export default function NoEncontrada() {
  return (
    <div className="contenedor flex min-h-[70svh] flex-col items-start justify-center pb-24 pt-40">
      <p className="etiqueta text-gris">Error 404</p>
      <h1 className="titulo mt-5 text-[clamp(2.1rem,5vw,4rem)]">Esta página no existe</h1>
      <p className="mt-6 max-w-lg text-lg font-light">Puede que el enlace haya cambiado. Te invitamos a volver al inicio.</p>
      <Boton href="/" className="mt-10">
        Volver al inicio
      </Boton>
    </div>
  );
}
