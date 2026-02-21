import { MapStyle } from '@/types/poster';
import { ThemeConfig } from '@/types/theme';

import { vintageTheme } from './vintage';
import { modernTheme } from './modern';
import { noirTheme } from './noir';
import { scandiTheme } from './scandi';
import { midnightTheme } from './midnight';
import { forestTheme } from './forest';
import { oceanTheme } from './ocean';
import { sunsetTheme } from './sunset';

export const themes: Record<MapStyle, ThemeConfig> = {
    vintage: vintageTheme,
    modern: modernTheme,
    noir: noirTheme,
    scandi: scandiTheme,
    midnight: midnightTheme,
    forest: forestTheme,
    ocean: oceanTheme,
    sunset: sunsetTheme
};
