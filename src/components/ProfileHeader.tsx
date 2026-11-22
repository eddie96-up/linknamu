import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={112}
        height={112}
        priority
        // SVG와 외부 URL(placehold.co는 SVG를 반환)은 Next 이미지 최적화를 건너뜀
        unoptimized={image.endsWith(".svg") || image.startsWith("http")}
        className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-md sm:h-28 sm:w-28 dark:ring-neutral-800"
      />
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">{name}</h1>
      <p className="mt-1 text-sm text-neutral-600 sm:text-base dark:text-neutral-400">{bio}</p>
    </header>
  );
}
