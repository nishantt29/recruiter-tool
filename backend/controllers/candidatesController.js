const { Candidate } = require('../models/candidate');

exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.header("Content-Type", "application/json");
    res.send(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addCandidate = async (req, res) => {
  const { name, email, phone, skills, status, expectedSalary, nodeExperience, reactExperience } = req.body;

  const totalScore = calculateTotalScore(nodeExperience, reactExperience);

  try {
    const result = await Candidate.create({
      name,
      email,
      phone,
      skills,
      status,
      expected_salary: expectedSalary,
      node_experience: nodeExperience,
      react_experience: reactExperience,
      total_score: totalScore,
    });

    res.json(result);
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, skills, status, expectedSalary, nodeExperience, reactExperience } = req.body;
  const totalScore = calculateTotalScore(nodeExperience, reactExperience);

  try {
    const result = await Candidate.update({
      name,
      email,
      phone,
      skills,
      status,
      expected_salary: expectedSalary,
      node_experience: nodeExperience,
      react_experience: reactExperience,
      total_score: totalScore,
    }, {
      where: { id },
      returning: true,
    });

    res.json(result[1][0]);
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteCandidate = async (req, res) => {
  const { id } = req.params;
  

  try {
    const candidate = await Candidate.findByPk(id);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    await candidate.destroy();

    return res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function calculateTotalScore(nodeExperience, reactExperience) {
  const nodeScore = calculateExperienceScore(nodeExperience);
  const reactScore = calculateExperienceScore(reactExperience);
  return nodeScore + reactScore;
}

function calculateExperienceScore(experience) {
  
  if (experience <= 1) return 1;
  if (experience >= 1 && experience <= 2) return 2;
  return 3;
}
