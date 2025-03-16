import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import type { FilterValues } from "../types";

interface JobFiltersProps {
    form: UseFormReturn<FilterValues>;
}

export const JobFilters = ({ form }: JobFiltersProps) => {
    return (
        <div className=" bg-white/50">
            <div className="container py-6">
                <h1 className="text-3xl font-manrope font-bold mb-6">
                    Find Your Next Job
                </h1>
                <div className="grid md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-end">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search jobs, companies, or keywords"
                            className="pl-10 h-12"
                            {...form.register("search")}
                        />
                    </div>
                    <Controller
                        name="location"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-[180px] h-12">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sf">
                                        San Francisco
                                    </SelectItem>
                                    <SelectItem value="ny">New York</SelectItem>
                                    <SelectItem value="ld">London</SelectItem>
                                    <SelectItem value="rm">Remote</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Controller
                        name="jobType"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-[180px] h-12">
                                    <SelectValue placeholder="Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full">
                                        Full-time
                                    </SelectItem>
                                    <SelectItem value="part">
                                        Part-time
                                    </SelectItem>
                                    <SelectItem value="contract">
                                        Contract
                                    </SelectItem>
                                    <SelectItem value="remote">
                                        Remote
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Controller
                        name="experience"
                        control={form.control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger className="w-[180px] h-12">
                                    <SelectValue placeholder="Experience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="entry">
                                        Entry Level
                                    </SelectItem>
                                    <SelectItem value="mid">
                                        Mid Level
                                    </SelectItem>
                                    <SelectItem value="senior">
                                        Senior Level
                                    </SelectItem>
                                    <SelectItem value="lead">Lead</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <Button className="h-12 px-8">Search</Button>
                </div>
            </div>
        </div>
    );
};
