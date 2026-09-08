import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya-chen',
        email: 'maya.chen@mergington.edu',
        displayName: 'Maya Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        username: 'leo-martinez',
        email: 'leo.martinez@mergington.edu',
        displayName: 'Leo Martinez',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'sophia-williams',
        email: 'sophia.williams@mergington.edu',
        displayName: 'Sophia Williams',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        username: 'noah-johnson',
        email: 'noah.johnson@mergington.edu',
        displayName: 'Noah Johnson',
        avatarUrl: 'https://i.pravatar.cc/150?img=68',
      },
    ]);

    const teams = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Steady progress, strong finish.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Peak Performers',
        description: 'Climb higher together.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 32, calories: 285, performedAt: new Date('2026-09-06T16:30:00Z') },
      { userId: users[1]._id, type: 'walking', durationMinutes: 45, calories: 190, performedAt: new Date('2026-09-06T15:00:00Z') },
      { userId: users[2]._id, type: 'strength training', durationMinutes: 40, calories: 260, performedAt: new Date('2026-09-05T17:15:00Z') },
      { userId: users[3]._id, type: 'running', durationMinutes: 25, calories: 225, performedAt: new Date('2026-09-04T16:00:00Z') },
      { userId: users[0]._id, type: 'strength training', durationMinutes: 30, calories: 210, performedAt: new Date('2026-09-03T16:45:00Z') },
    ]);

    await LeaderboardEntry.create([
      { userId: users[0]._id, teamId: teams[0]._id, points: 850, rank: 1, period: 'September 2026' },
      { userId: users[2]._id, teamId: teams[1]._id, points: 790, rank: 2, period: 'September 2026' },
      { userId: users[1]._id, teamId: teams[0]._id, points: 640, rank: 3, period: 'September 2026' },
      { userId: users[3]._id, teamId: teams[1]._id, points: 520, rank: 4, period: 'September 2026' },
    ]);

    await Workout.create([
      {
        name: 'Easy Start Run',
        description: 'A comfortable running session to build consistency.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Warm-up walk', 'Easy run', 'Cool-down stretch'],
      },
      {
        name: 'Full Body Foundation',
        description: 'A balanced strength session using bodyweight movements.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        name: 'Power Circuit',
        description: 'A challenging circuit for students ready to level up.',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['Burpees', 'Mountain climbers', 'Jump squats', 'Bear crawl'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
