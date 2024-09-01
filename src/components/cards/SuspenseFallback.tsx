import React from 'react'
import Loader from '../general/Loader';
import { cn } from '@/lib/utils';

type Props = {
  className?: string
  spinnerSize?: 'sm' | 'md' | 'lg'
}

const SuspenseFallback = ({ className, spinnerSize = 'md' }: Props) => {
  return (
    <div
      className={cn(
        `flex-1 w-full h-full flex items-center justify-center ${className}`
      )}
    >
      <Loader
        className={
          spinnerSize === "lg"
            ? "w-[45px]"
            : spinnerSize === "md"
            ? "w-[35px]"
            : "w-[30px]"
        }
      />
    </div>
  );
}

export default SuspenseFallback