package ir.online_exam.web.rest;

import ir.online_exam.OnlineExamApplicationApp;
import ir.online_exam.domain.Teacher;
import ir.online_exam.repository.TeacherRepository;
import ir.online_exam.service.TeacherService;
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

import ir.online_exam.domain.enumeration.Gender;
/**
 * Integration tests for the {@Link TeacherResource} REST controller.
 */
@SpringBootTest(classes = OnlineExamApplicationApp.class)
public class TeacherResourceIT {

    private static final String DEFAULT_TEACHER_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEACHER_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TEACHER_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TEACHER_LAST_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.Male;
    private static final Gender UPDATED_GENDER = Gender.Female;

    private static final String DEFAULT_BIRTH_DATE = "AAAAAAAAAA";
    private static final String UPDATED_BIRTH_DATE = "BBBBBBBBBB";

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TeacherService teacherService;

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

    private MockMvc restTeacherMockMvc;

    private Teacher teacher;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeacherResource teacherResource = new TeacherResource(teacherService);
        this.restTeacherMockMvc = MockMvcBuilders.standaloneSetup(teacherResource)
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
    public static Teacher createEntity(EntityManager em) {
        Teacher teacher = new Teacher()
            .teacherFirstName(DEFAULT_TEACHER_FIRST_NAME)
            .teacherLastName(DEFAULT_TEACHER_LAST_NAME)
            .gender(DEFAULT_GENDER)
            .birthDate(DEFAULT_BIRTH_DATE);
        return teacher;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teacher createUpdatedEntity(EntityManager em) {
        Teacher teacher = new Teacher()
            .teacherFirstName(UPDATED_TEACHER_FIRST_NAME)
            .teacherLastName(UPDATED_TEACHER_LAST_NAME)
            .gender(UPDATED_GENDER)
            .birthDate(UPDATED_BIRTH_DATE);
        return teacher;
    }

    @BeforeEach
    public void initTest() {
        teacher = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeacher() throws Exception {
        int databaseSizeBeforeCreate = teacherRepository.findAll().size();

        // Create the Teacher
        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacher)))
            .andExpect(status().isCreated());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeCreate + 1);
        Teacher testTeacher = teacherList.get(teacherList.size() - 1);
        assertThat(testTeacher.getTeacherFirstName()).isEqualTo(DEFAULT_TEACHER_FIRST_NAME);
        assertThat(testTeacher.getTeacherLastName()).isEqualTo(DEFAULT_TEACHER_LAST_NAME);
        assertThat(testTeacher.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testTeacher.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
    }

    @Test
    @Transactional
    public void createTeacherWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teacherRepository.findAll().size();

        // Create the Teacher with an existing ID
        teacher.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeacherMockMvc.perform(post("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacher)))
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTeachers() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get all the teacherList
        restTeacherMockMvc.perform(get("/api/teachers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teacher.getId().intValue())))
            .andExpect(jsonPath("$.[*].teacherFirstName").value(hasItem(DEFAULT_TEACHER_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].teacherLastName").value(hasItem(DEFAULT_TEACHER_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTeacher() throws Exception {
        // Initialize the database
        teacherRepository.saveAndFlush(teacher);

        // Get the teacher
        restTeacherMockMvc.perform(get("/api/teachers/{id}", teacher.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teacher.getId().intValue()))
            .andExpect(jsonPath("$.teacherFirstName").value(DEFAULT_TEACHER_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.teacherLastName").value(DEFAULT_TEACHER_LAST_NAME.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTeacher() throws Exception {
        // Get the teacher
        restTeacherMockMvc.perform(get("/api/teachers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeacher() throws Exception {
        // Initialize the database
        teacherService.save(teacher);

        int databaseSizeBeforeUpdate = teacherRepository.findAll().size();

        // Update the teacher
        Teacher updatedTeacher = teacherRepository.findById(teacher.getId()).get();
        // Disconnect from session so that the updates on updatedTeacher are not directly saved in db
        em.detach(updatedTeacher);
        updatedTeacher
            .teacherFirstName(UPDATED_TEACHER_FIRST_NAME)
            .teacherLastName(UPDATED_TEACHER_LAST_NAME)
            .gender(UPDATED_GENDER)
            .birthDate(UPDATED_BIRTH_DATE);

        restTeacherMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeacher)))
            .andExpect(status().isOk());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeUpdate);
        Teacher testTeacher = teacherList.get(teacherList.size() - 1);
        assertThat(testTeacher.getTeacherFirstName()).isEqualTo(UPDATED_TEACHER_FIRST_NAME);
        assertThat(testTeacher.getTeacherLastName()).isEqualTo(UPDATED_TEACHER_LAST_NAME);
        assertThat(testTeacher.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testTeacher.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTeacher() throws Exception {
        int databaseSizeBeforeUpdate = teacherRepository.findAll().size();

        // Create the Teacher

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeacherMockMvc.perform(put("/api/teachers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacher)))
            .andExpect(status().isBadRequest());

        // Validate the Teacher in the database
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeacher() throws Exception {
        // Initialize the database
        teacherService.save(teacher);

        int databaseSizeBeforeDelete = teacherRepository.findAll().size();

        // Delete the teacher
        restTeacherMockMvc.perform(delete("/api/teachers/{id}", teacher.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Teacher> teacherList = teacherRepository.findAll();
        assertThat(teacherList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teacher.class);
        Teacher teacher1 = new Teacher();
        teacher1.setId(1L);
        Teacher teacher2 = new Teacher();
        teacher2.setId(teacher1.getId());
        assertThat(teacher1).isEqualTo(teacher2);
        teacher2.setId(2L);
        assertThat(teacher1).isNotEqualTo(teacher2);
        teacher1.setId(null);
        assertThat(teacher1).isNotEqualTo(teacher2);
    }
}
