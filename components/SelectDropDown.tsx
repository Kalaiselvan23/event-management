import React from 'react';
import { SelectTrigger, SelectValue, SelectItem, SelectContent } from '@radix-ui/react-select';
import { Select, SelectLabel, SelectGroup } from './ui/select';
const SelectDropDown = ({ value, onValueChange, placeholder, options, selectLabel }: any) => {
    return (
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{selectLabel}</SelectLabel>
                    {options.map((option: any) => {
                        return <SelectItem value={option.id} key={option.id}>
                            {option.name}
                        </SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectDropDown;
