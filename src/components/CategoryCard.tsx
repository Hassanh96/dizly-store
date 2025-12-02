// src/components/CategoryCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface Category {
    id: string;
    name: string;
    image: string;
}

const CategoryCard = ({ category }: { category: Category }) => {
    return (
        <Link href={`/category/${category.id}`} className="block text-center transition duration-300 transform hover:scale-105 group">
            <div className="w-full aspect-square relative rounded-lg overflow-hidden shadow-md border-2 border-gray-100 group-hover:border-indigo-500">
                 <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-300 group-hover:opacity-80"
                />
            </div>
            <p className="mt-3 text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                {category.name}
            </p>
        </Link>
    );
};

export default CategoryCard;