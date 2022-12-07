import { useCallback, useEffect, useState } from 'react';
import type { Section } from './types';

type InSectionProps = {
  sectionClassName?: string;
};

type InSectionType = {
  currentSection?: Section;
};

export function useInSection(props: InSectionProps): InSectionType {
  const { sectionClassName } = props;
  const [currentSection, setCurrentSection] = useState<Section>();

  const onScroll = useCallback((allSectionWithYValues: Section[]): void => {
    const currentSectionWithYValue = allSectionWithYValues.find(
      (a) => a.startYValue <= window.scrollY && a.endYValue > window.scrollY,
    );

    setCurrentSection(currentSectionWithYValue);
  }, []);

  useEffect(() => {
    const allSections = document.querySelectorAll(
      sectionClassName ? `.${sectionClassName}` : 'section',
    );
    const allSectionWithYValues: Section[] = [];
    allSections.forEach((section, index) => {
      allSectionWithYValues.push({
        id: index,
        startYValue: window.pageYOffset + section.getBoundingClientRect().top,
        endYValue: window.pageYOffset + section.getBoundingClientRect().bottom,
      });
    });

    window.addEventListener('scroll', () => onScroll(allSectionWithYValues));

    return () => {
      window.removeEventListener('scroll', () =>
        onScroll(allSectionWithYValues),
      );
    };
  }, []);

  return { currentSection };
}
