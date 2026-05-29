package com.ai_based_resume_generator.service;

import com.ai_based_resume_generator.model.Resume;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

	public ByteArrayInputStream generatePdf(Resume resume) {

		Document document = new Document();

		ByteArrayOutputStream out = new ByteArrayOutputStream();

		try {

			PdfWriter.getInstance(document, out);

			document.open();

			Font heading = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);

			Font normal = FontFactory.getFont(FontFactory.HELVETICA, 12);

			document.add(new Paragraph(resume.getFullName(), heading));

			document.add(new Paragraph("Email: " + resume.getEmail(), normal));

			document.add(new Paragraph("Phone: " + resume.getPhone(), normal));

			document.add(new Paragraph("GitHub: " + resume.getGithub(), normal));

			document.add(new Paragraph("LinkedIn: " + resume.getLinkedin(), normal));

			document.add(new Paragraph("Portfolio: " + resume.getPortfolio(), normal));

			document.add(new Paragraph(" "));

			document.add(new Paragraph("Professional Summary", heading));

			document.add(new Paragraph(resume.getSummary(), normal));

			document.add(new Paragraph(" "));

			document.add(new Paragraph("Skills", heading));

			document.add(new Paragraph(resume.getSkills(), normal));

			document.add(new Paragraph(" "));

			document.add(new Paragraph("Education", heading));

			document.add(new Paragraph(resume.getEducation(), normal));

			document.add(new Paragraph(" "));

			document.add(new Paragraph("Experience", heading));

			document.add(new Paragraph(resume.getExperience(), normal));

			document.add(new Paragraph(" "));

			document.add(new Paragraph("Projects", heading));

			document.add(new Paragraph(resume.getProjects(), normal));

			document.add(new Paragraph(" "));

			document.add(new Paragraph("Languages", heading));

			document.add(new Paragraph(resume.getLanguages(), normal));

			document.add(new Paragraph(" "));

			document.add(new Paragraph("Hobbies", heading));

			document.add(new Paragraph(resume.getHobbies(), normal));

			document.close();

		} catch (Exception e) {

			e.printStackTrace();
		}

		return new ByteArrayInputStream(out.toByteArray());
	}
}