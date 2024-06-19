'use client';

import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from '@/components/ui/select';

import { updateActiveUnit } from '@/actions/users';
import { useSession } from 'next-auth/react';

export const UnitSelect = ({ units }: { units: string[] }) => {
  const session = useSession();
  const router = useRouter();
  const { activeUnit, email } = session.data?.user || {};

  return (
    <Select
      onValueChange={async (value) => {
        // TODO: handle error
        await updateActiveUnit(email as string, value);
        await session.update({ activeUnit: value });
        router.refresh();
      }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={activeUnit ? activeUnit : 'No active unit.'}
        />
      </SelectTrigger>
      <SelectContent>
        {units.length ? (
          units.map((unit, index) => (
            <SelectItem key={`${unit}${index}`} value={unit}>
              {unit}
            </SelectItem>
          ))
        ) : (
          <SelectGroup>
            <SelectLabel>You are not associated with a unit.</SelectLabel>
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};
