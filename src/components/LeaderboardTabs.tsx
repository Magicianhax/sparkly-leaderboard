
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardSection from './LeaderboardSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { readLeaderboardData } from '@/utils/excelUtils';

interface LeaderboardData {
  address: string;
  sparks: number;
}

interface TabData {
  data: LeaderboardData[];
  totalPages: number;
}

interface LeaderboardTabsProps {
  overallData: TabData;
  week1Data: TabData;
  week2Data: TabData;
  week3Data: TabData;
  week4Data: TabData;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const LeaderboardTabs = ({
  overallData,
  week1Data,
  week2Data,
  week3Data,
  week4Data,
  currentPage,
  onPageChange
}: LeaderboardTabsProps) => {
  // Use separate search terms for each tab
  const [overallSearchTerm, setOverallSearchTerm] = React.useState("");
  const [week1SearchTerm, setWeek1SearchTerm] = React.useState("");
  const [week2SearchTerm, setWeek2SearchTerm] = React.useState("");
  const [week3SearchTerm, setWeek3SearchTerm] = React.useState("");
  const [week4SearchTerm, setWeek4SearchTerm] = React.useState("");
  
  // State to hold full data for searching
  const [fullData, setFullData] = useState<{
    overall: LeaderboardData[];
    week1: LeaderboardData[];
    week2: LeaderboardData[];
    week3: LeaderboardData[];
    week4: LeaderboardData[];
  }>({
    overall: [],
    week1: [],
    week2: [],
    week3: [],
    week4: []
  });
  
  const isMobile = useIsMobile();

  // Load full data for searching
  useEffect(() => {
    const loadFullData = async () => {
      const data = await readLeaderboardData(1, true);
      if (data) {
        setFullData({
          overall: data.overall.data,
          week1: data.week1.data,
          week2: data.week2.data,
          week3: data.week3.data,
          week4: data.week4.data,
        });
      }
    };
    
    loadFullData();
  }, []);

  return (
    <Tabs defaultValue="overall" className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 gap-1">
        <TabsTrigger value="overall" className="text-sm sm:text-base">
          {isMobile ? "All" : "Overall"}
        </TabsTrigger>
        <TabsTrigger value="week1" className="text-sm sm:text-base">W1</TabsTrigger>
        <TabsTrigger value="week2" className="text-sm sm:text-base">W2</TabsTrigger>
        {!isMobile && (
          <>
            <TabsTrigger value="week3" className="text-sm sm:text-base">Week 3</TabsTrigger>
            <TabsTrigger value="week4" className="text-sm sm:text-base">Week 4</TabsTrigger>
          </>
        )}
      </TabsList>
      
      {isMobile && (
        <TabsList className="grid w-full grid-cols-2 gap-1">
          <TabsTrigger value="week3" className="text-sm sm:text-base">W3</TabsTrigger>
          <TabsTrigger value="week4" className="text-sm sm:text-base">W4</TabsTrigger>
        </TabsList>
      )}
      
      <TabsContent value="overall">
        <LeaderboardSection
          title="Firewall Sparks Leaderboard"
          data={overallData.data}
          fullData={fullData.overall}
          totalPages={overallData.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={overallSearchTerm}
          onSearchChange={setOverallSearchTerm}
        />
      </TabsContent>
      
      <TabsContent value="week1">
        <LeaderboardSection
          title="Week 1 Leaderboard"
          data={week1Data.data}
          fullData={fullData.week1}
          totalPages={week1Data.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={week1SearchTerm}
          onSearchChange={setWeek1SearchTerm}
        />
      </TabsContent>
      
      <TabsContent value="week2">
        <LeaderboardSection
          title="Week 2 Leaderboard"
          data={week2Data.data}
          fullData={fullData.week2}
          totalPages={week2Data.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={week2SearchTerm}
          onSearchChange={setWeek2SearchTerm}
        />
      </TabsContent>
      
      <TabsContent value="week3">
        <LeaderboardSection
          title="Week 3 Leaderboard"
          data={week3Data.data}
          fullData={fullData.week3}
          totalPages={week3Data.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={week3SearchTerm}
          onSearchChange={setWeek3SearchTerm}
        />
      </TabsContent>
      
      <TabsContent value="week4">
        <LeaderboardSection
          title="Week 4 Leaderboard"
          data={week4Data.data}
          fullData={fullData.week4}
          totalPages={week4Data.totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          searchTerm={week4SearchTerm}
          onSearchChange={setWeek4SearchTerm}
        />
      </TabsContent>
    </Tabs>
  );
};

export default LeaderboardTabs;
