import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/lib/routes';

const CreateGroupCard = () => {
    return (
        <Link href={"/"}>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors cursor-pointer">
                <Plus size={48} />
                <p className="mt-2 font-semibold">Create New Group</p>
            </div>
        </Link>
    );
};

export default CreateGroupCard;