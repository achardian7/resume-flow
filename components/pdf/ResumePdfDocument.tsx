import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';
import { ResumeData, SectionType } from '@/types/resume';

interface ResumePdfDocumentProps {
  data: ResumeData;
}

export const ResumePdfDocument: React.FC<ResumePdfDocumentProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, certifications, sections, settings } = data;

  const font = settings.fontFamily || 'Helvetica';
  const isTimes = font === 'Times-Roman';
  const boldFont = isTimes ? 'Times-Bold' : font === 'Courier' ? 'Courier-Bold' : 'Helvetica-Bold';
  const obliqueFont = isTimes ? 'Times-Italic' : font === 'Courier' ? 'Courier-Oblique' : 'Helvetica-Oblique';

  // Sizing based on settings
  const baseFontSize = settings.fontSize === 'small' ? 9.5 : settings.fontSize === 'large' ? 11 : 10;
  const headingFontSize = settings.fontSize === 'small' ? 12 : settings.fontSize === 'large' ? 14 : 13;
  const nameFontSize = settings.fontSize === 'small' ? 20 : settings.fontSize === 'large' ? 24 : 22;

  const lineHeight = settings.spacing === 'compact' ? 1.25 : settings.spacing === 'spacious' ? 1.5 : 1.35;
  const sectionMarginBottom = settings.spacing === 'compact' ? 8 : settings.spacing === 'spacious' ? 14 : 10;
  const itemMarginBottom = settings.spacing === 'compact' ? 4 : settings.spacing === 'spacious' ? 8 : 6;

  const accentColor = settings.accentColor || '#111827';

  const styles = StyleSheet.create({
    page: {
      paddingTop: 36,
      paddingBottom: 36,
      paddingHorizontal: 40,
      fontFamily: font,
      fontSize: baseFontSize,
      lineHeight: lineHeight,
      color: '#1f2937',
    },
    // Header
    headerContainer: {
      marginBottom: sectionMarginBottom,
      textAlign: settings.template === 'ats-modern' ? 'left' : 'center',
      borderBottomWidth: settings.template === 'ats-modern' ? 1.5 : 0,
      borderBottomColor: accentColor,
      paddingBottom: settings.template === 'ats-modern' ? 8 : 0,
    },
    name: {
      fontFamily: boldFont,
      fontSize: nameFontSize,
      lineHeight: 1.25,
      color: accentColor,
      paddingBottom: 2,
      marginBottom: 6,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    jobTitle: {
      fontSize: baseFontSize + 1.5,
      fontFamily: obliqueFont,
      lineHeight: 1.3,
      color: '#4b5563',
      marginBottom: 7,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: settings.template === 'ats-modern' ? 'flex-start' : 'center',
      gap: 6,
      fontSize: baseFontSize - 0.5,
      color: '#4b5563',
      marginTop: 2,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    link: {
      color: '#1f2937',
      textDecoration: 'none',
    },
    separator: {
      marginHorizontal: 3,
      color: '#9ca3af',
    },

    // Sections
    section: {
      marginBottom: sectionMarginBottom,
    },
    sectionTitle: {
      fontFamily: boldFont,
      fontSize: headingFontSize,
      color: accentColor,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      borderBottomWidth: settings.showDividers ? 1 : 0,
      borderBottomColor: '#d1d5db',
      paddingBottom: 2,
      marginBottom: 5,
    },

    // Summary
    summaryText: {
      textAlign: 'justify',
      color: '#374151',
    },

    // Items
    item: {
      marginBottom: itemMarginBottom,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 1.5,
    },
    itemTitle: {
      fontFamily: boldFont,
      fontSize: baseFontSize + 0.5,
      color: '#111827',
    },
    itemSubtitle: {
      fontFamily: obliqueFont,
      color: '#374151',
    },
    itemDate: {
      fontSize: baseFontSize - 0.5,
      fontFamily: boldFont,
      color: '#4b5563',
    },
    itemLocation: {
      fontSize: baseFontSize - 0.5,
      fontFamily: obliqueFont,
      color: '#6b7280',
    },

    // Bullet points
    bulletList: {
      marginTop: 2,
      paddingLeft: 4,
    },
    bulletRow: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    bulletPoint: {
      width: 10,
      fontSize: baseFontSize,
      color: '#374151',
    },
    bulletText: {
      flex: 1,
      color: '#374151',
      textAlign: 'justify',
    },

    // Skills
    skillCategoryRow: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    skillCategoryName: {
      fontFamily: boldFont,
      color: '#111827',
      width: 130,
    },
    skillsText: {
      flex: 1,
      color: '#374151',
    },
  });

  const renderSection = (sectionId: SectionType, customTitle: string) => {
    switch (sectionId) {
      case 'summary':
        if (!personalInfo.summary.trim()) return null;
        return (
          <View key="summary" style={styles.section}>
            <Text style={styles.sectionTitle}>{customTitle}</Text>
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        );

      case 'experience':
        if (experiences.length === 0) return null;
        return (
          <View key="experience" style={styles.section}>
            <Text style={styles.sectionTitle}>{customTitle}</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.itemDate}>
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate || 'Present'}
                  </Text>
                </View>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  {exp.location && <Text style={styles.itemLocation}>{exp.location}</Text>}
                </View>
                {exp.bullets && exp.bullets.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.bullets
                      .filter((b) => b.trim().length > 0)
                      .map((bullet, idx) => (
                        <View key={idx} style={styles.bulletRow}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <View key="education" style={styles.section}>
            <Text style={styles.sectionTitle}>{customTitle}</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.institution}</Text>
                  <Text style={styles.itemDate}>
                    {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate || 'Present'}
                  </Text>
                </View>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemSubtitle}>
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
                    {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                  </Text>
                  {edu.location && <Text style={styles.itemLocation}>{edu.location}</Text>}
                </View>
                {edu.highlights && edu.highlights.length > 0 && (
                  <View style={styles.bulletList}>
                    {edu.highlights
                      .filter((h) => h.trim().length > 0)
                      .map((item, idx) => (
                        <View key={idx} style={styles.bulletRow}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletText}>{item}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <View key="skills" style={styles.section}>
            <Text style={styles.sectionTitle}>{customTitle}</Text>
            {skills.map((category) => (
              <View key={category.id} style={styles.skillCategoryRow}>
                <Text style={styles.skillCategoryName}>{category.name}:</Text>
                <Text style={styles.skillsText}>{category.skills.join(', ')}</Text>
              </View>
            ))}
          </View>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <View key="projects" style={styles.section}>
            <Text style={styles.sectionTitle}>{customTitle}</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.title}</Text>
                  <Text style={styles.itemDate}>
                    {proj.startDate}
                    {proj.endDate ? ` – ${proj.endDate}` : ''}
                  </Text>
                </View>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemSubtitle}>
                    {proj.role ? `${proj.role} ` : ''}
                    {proj.technologies ? `[${proj.technologies}]` : ''}
                  </Text>
                  {proj.link && (
                    <Link src={proj.link} style={[styles.link, styles.itemLocation]}>
                      {proj.link.replace(/^https?:\/\//, '')}
                    </Link>
                  )}
                </View>
                {proj.bullets && proj.bullets.length > 0 && (
                  <View style={styles.bulletList}>
                    {proj.bullets
                      .filter((b) => b.trim().length > 0)
                      .map((bullet, idx) => (
                        <View key={idx} style={styles.bulletRow}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        );

      case 'certifications':
        if (certifications.length === 0) return null;
        return (
          <View key="certifications" style={styles.section}>
            <Text style={styles.sectionTitle}>{customTitle}</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{cert.name}</Text>
                  <Text style={styles.itemDate}>
                    {cert.issueDate}
                    {cert.expirationDate ? ` – ${cert.expirationDate}` : ''}
                  </Text>
                </View>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemSubtitle}>
                    {cert.issuer}
                    {cert.credentialId ? ` (ID: ${cert.credentialId})` : ''}
                  </Text>
                  {cert.url && (
                    <Link src={cert.url} style={[styles.link, styles.itemLocation]}>
                      Verify
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  // Contacts list
  const contactParts: React.ReactNode[] = [];
  if (personalInfo.email) {
    contactParts.push(
      <Link key="email" src={`mailto:${personalInfo.email}`} style={styles.link}>
        {personalInfo.email}
      </Link>
    );
  }
  if (personalInfo.phone) {
    contactParts.push(
      <Text key="phone">{personalInfo.phone}</Text>
    );
  }
  if (personalInfo.location) {
    contactParts.push(
      <Text key="loc">{personalInfo.location}</Text>
    );
  }
  if (personalInfo.linkedin) {
    contactParts.push(
      <Link key="linkedin" src={`https://${personalInfo.linkedin.replace(/^https?:\/\//, '')}`} style={styles.link}>
        {personalInfo.linkedin.replace(/^https?:\/\//, '')}
      </Link>
    );
  }
  if (personalInfo.github) {
    contactParts.push(
      <Link key="github" src={`https://${personalInfo.github.replace(/^https?:\/\//, '')}`} style={styles.link}>
        {personalInfo.github.replace(/^https?:\/\//, '')}
      </Link>
    );
  }
  if (personalInfo.website) {
    contactParts.push(
      <Link key="web" src={`https://${personalInfo.website.replace(/^https?:\/\//, '')}`} style={styles.link}>
        {personalInfo.website.replace(/^https?:\/\//, '')}
      </Link>
    );
  }

  // Sorted sections according to user order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <Document
      title={`${personalInfo.fullName || 'Resume'} - ATS Resume`}
      author={personalInfo.fullName}
      subject="Curriculum Vitae / Resume"
      keywords="Resume, CV, ATS, Software Engineer, Professional"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{personalInfo.fullName || 'Nama Lengkap'}</Text>
          {personalInfo.jobTitle && <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>}
          <View style={styles.contactRow}>
            {contactParts.map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < contactParts.length - 1 && <Text style={styles.separator}>|</Text>}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Dynamic Reorderable Sections */}
        {sortedSections.map((sec) => {
          if (!sec.isVisible) return null;
          return renderSection(sec.id, sec.customTitle || sec.defaultTitle);
        })}
      </Page>
    </Document>
  );
};
