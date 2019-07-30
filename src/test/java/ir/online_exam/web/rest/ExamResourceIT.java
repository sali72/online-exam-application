package ir.online_exam.web.rest;

import ir.online_exam.OnlineExamApplicationApp;
import ir.online_exam.domain.Exam;
import ir.online_exam.repository.ExamRepository;
import ir.online_exam.service.ExamService;
import ir.online_exam.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static ir.online_exam.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link ExamResource} REST controller.
 */
@SpringBootTest(classes = OnlineExamApplicationApp.class)
public class ExamResourceIT {

    private static final String DEFAULT_EXAM_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_EXAM_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    private static final String DEFAULT_REQUIRED_TIME = "AAAAAAAAAA";
    private static final String UPDATED_REQUIRED_TIME = "BBBBBBBBBB";

    private static final Double DEFAULT_TOTAL_MARK = 1D;
    private static final Double UPDATED_TOTAL_MARK = 2D;

    private static final Double DEFAULT_MAX_TOTAL_MARK = 1D;
    private static final Double UPDATED_MAX_TOTAL_MARK = 2D;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ExamService examService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restExamMockMvc;

    private Exam exam;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExamResource examResource = new ExamResource(examService);
        this.restExamMockMvc = MockMvcBuilders.standaloneSetup(examResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exam createEntity(EntityManager em) {
        Exam exam = new Exam()
            .examTitle(DEFAULT_EXAM_TITLE)
            .details(DEFAULT_DETAILS)
            .requiredTime(DEFAULT_REQUIRED_TIME)
            .totalMark(DEFAULT_TOTAL_MARK)
            .maxTotalMark(DEFAULT_MAX_TOTAL_MARK);
        return exam;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exam createUpdatedEntity(EntityManager em) {
        Exam exam = new Exam()
            .examTitle(UPDATED_EXAM_TITLE)
            .details(UPDATED_DETAILS)
            .requiredTime(UPDATED_REQUIRED_TIME)
            .totalMark(UPDATED_TOTAL_MARK)
            .maxTotalMark(UPDATED_MAX_TOTAL_MARK);
        return exam;
    }

    @BeforeEach
    public void initTest() {
        exam = createEntity(em);
    }

    @Test
    @Transactional
    public void createExam() throws Exception {
        int databaseSizeBeforeCreate = examRepository.findAll().size();

        // Create the Exam
        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isCreated());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeCreate + 1);
        Exam testExam = examList.get(examList.size() - 1);
        assertThat(testExam.getExamTitle()).isEqualTo(DEFAULT_EXAM_TITLE);
        assertThat(testExam.getDetails()).isEqualTo(DEFAULT_DETAILS);
        assertThat(testExam.getRequiredTime()).isEqualTo(DEFAULT_REQUIRED_TIME);
        assertThat(testExam.getTotalMark()).isEqualTo(DEFAULT_TOTAL_MARK);
        assertThat(testExam.getMaxTotalMark()).isEqualTo(DEFAULT_MAX_TOTAL_MARK);
    }

    @Test
    @Transactional
    public void createExamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = examRepository.findAll().size();

        // Create the Exam with an existing ID
        exam.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExams() throws Exception {
        // Initialize the database
        examRepository.saveAndFlush(exam);

        // Get all the examList
        restExamMockMvc.perform(get("/api/exams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exam.getId().intValue())))
            .andExpect(jsonPath("$.[*].examTitle").value(hasItem(DEFAULT_EXAM_TITLE.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS.toString())))
            .andExpect(jsonPath("$.[*].requiredTime").value(hasItem(DEFAULT_REQUIRED_TIME.toString())))
            .andExpect(jsonPath("$.[*].totalMark").value(hasItem(DEFAULT_TOTAL_MARK.doubleValue())))
            .andExpect(jsonPath("$.[*].maxTotalMark").value(hasItem(DEFAULT_MAX_TOTAL_MARK.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getExam() throws Exception {
        // Initialize the database
        examRepository.saveAndFlush(exam);

        // Get the exam
        restExamMockMvc.perform(get("/api/exams/{id}", exam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exam.getId().intValue()))
            .andExpect(jsonPath("$.examTitle").value(DEFAULT_EXAM_TITLE.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()))
            .andExpect(jsonPath("$.requiredTime").value(DEFAULT_REQUIRED_TIME.toString()))
            .andExpect(jsonPath("$.totalMark").value(DEFAULT_TOTAL_MARK.doubleValue()))
            .andExpect(jsonPath("$.maxTotalMark").value(DEFAULT_MAX_TOTAL_MARK.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingExam() throws Exception {
        // Get the exam
        restExamMockMvc.perform(get("/api/exams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExam() throws Exception {
        // Initialize the database
        examService.save(exam);

        int databaseSizeBeforeUpdate = examRepository.findAll().size();

        // Update the exam
        Exam updatedExam = examRepository.findById(exam.getId()).get();
        // Disconnect from session so that the updates on updatedExam are not directly saved in db
        em.detach(updatedExam);
        updatedExam
            .examTitle(UPDATED_EXAM_TITLE)
            .details(UPDATED_DETAILS)
            .requiredTime(UPDATED_REQUIRED_TIME)
            .totalMark(UPDATED_TOTAL_MARK)
            .maxTotalMark(UPDATED_MAX_TOTAL_MARK);

        restExamMockMvc.perform(put("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExam)))
            .andExpect(status().isOk());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeUpdate);
        Exam testExam = examList.get(examList.size() - 1);
        assertThat(testExam.getExamTitle()).isEqualTo(UPDATED_EXAM_TITLE);
        assertThat(testExam.getDetails()).isEqualTo(UPDATED_DETAILS);
        assertThat(testExam.getRequiredTime()).isEqualTo(UPDATED_REQUIRED_TIME);
        assertThat(testExam.getTotalMark()).isEqualTo(UPDATED_TOTAL_MARK);
        assertThat(testExam.getMaxTotalMark()).isEqualTo(UPDATED_MAX_TOTAL_MARK);
    }

    @Test
    @Transactional
    public void updateNonExistingExam() throws Exception {
        int databaseSizeBeforeUpdate = examRepository.findAll().size();

        // Create the Exam

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExamMockMvc.perform(put("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExam() throws Exception {
        // Initialize the database
        examService.save(exam);

        int databaseSizeBeforeDelete = examRepository.findAll().size();

        // Delete the exam
        restExamMockMvc.perform(delete("/api/exams/{id}", exam.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Exam.class);
        Exam exam1 = new Exam();
        exam1.setId(1L);
        Exam exam2 = new Exam();
        exam2.setId(exam1.getId());
        assertThat(exam1).isEqualTo(exam2);
        exam2.setId(2L);
        assertThat(exam1).isNotEqualTo(exam2);
        exam1.setId(null);
        assertThat(exam1).isNotEqualTo(exam2);
    }
}
