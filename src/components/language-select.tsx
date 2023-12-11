"use client";

import { SupportedLanguage, languages } from "@/lib/languages";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type LanguageSelectProps = {
  setLanguage: (language: SupportedLanguage) => void;
};

export default function LanguageSelect({ setLanguage }: LanguageSelectProps) {
  return (
    <Select onValueChange={(e: SupportedLanguage) => setLanguage(e)}>
      <SelectTrigger className="h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4">
        <span className="text-muted-foreground">Language: </span>
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent>
        {Object.values(languages).map((lang) => (
          <SelectItem
            value={lang.name}
            key={lang.name}
            className="text-xs"
            disabled={lang?.wip}
            warn={lang?.wip}
          >
            <span className={lang.wip ? "text-muted-foreground" : ""}>
              {lang.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
