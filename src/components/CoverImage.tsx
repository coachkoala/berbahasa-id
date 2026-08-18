import Image from "next/image";
import type { CoverImage as CoverImageType } from "@/lib/articles";

export function CoverImage({ image }: { image: CoverImageType }) {
  return (
    <figure className="flex flex-col gap-1.5">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[18px] border-[3px] border-[#111] bg-[#F7F5EF]">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 760px, 100vw" className="object-cover" priority />
      </div>
      {image.credit && <figcaption className="text-xs text-[#8a8a8a]">{image.credit}</figcaption>}
    </figure>
  );
}
