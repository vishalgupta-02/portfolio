"use client";

import Backend from "../(components)/backend";
import Core from "../(components)/core";
import Databases from "../(components)/databases";
import DevopsInfra from "../(components)/devops-infra";
import Exploring from "../(components)/exploring";
import Frontend from "../(components)/frontend";
import Languages from "../(components)/languages";
import Note from "../(components)/note";
import TestingQuality from "../(components)/testing-quality";
import WorkingKnowledge from "../(components)/working-knowledge";

export default function Skills() {
  return (
    <div className="pt-24 space-y-4">
      <div className="w-full max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-6xl font-bold mb-6 tracking-tighter">Skills</h1>
        <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
          A comprehensive overview of my technical proficiencies and the tools I
          utilize to bring projects to life.
        </p>
      </div>
      <div className="space-y-4">
        <div className="px-8 py-4">
          <p className="text-3xl font-semibold tracking-tighter">
            Proficiency Levels
          </p>
        </div>
        <div className="space-y-12">
          <Core />
          <WorkingKnowledge />
          <Exploring />
        </div>
      </div>
      <div className="space-y-4 mt-12">
        <div className="px-8 py-4">
          <p className="text-3xl font-semibold tracking-tighter">By Domain</p>
        </div>
        <div className="space-y-12 px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Languages />
            <Frontend />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Backend />
            <Databases />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DevopsInfra />
            <TestingQuality />
          </div>
        </div>
      </div>
      <div>
        <Note />
      </div>
    </div>
  );
}
