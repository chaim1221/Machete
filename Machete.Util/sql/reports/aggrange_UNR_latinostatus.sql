declare @startDate DateTime = '1/1/2016'
declare @endDate DateTime = '1/1/2017'

select 
convert(varchar(8), @startDate, 112) + '-' + convert(varchar(8), @endDate, 112) + '-WorkersByLatinoStatus-' + min(raceID) as id,
raceID as [Latino status], 
count(*) as [Count]
FROM (
  select W.ID, 
  CASE 
	WHEN W.raceID = 5 then 'Spanish/Hispanic/Latino'
	when W.raceID <> 5 then 'Not Spanish/Hispanic/Latino'
	when W.raceID is null then 'NULL'
  END as raceID
  from Workers W
  JOIN dbo.WorkerSignins WSI ON W.ID = WSI.WorkerID
  WHERE dateforsignin >= @startDate and dateforsignin <= @endDate
  group by W.ID, W.raceID
) as WW
group by raceID
union
select 
convert(varchar(8), @startDate, 112) + '-' + convert(varchar(8), @endDate, 112) + '-WorkersByLatinoStatus-TOTAL'  as id,
'Total' as [Latino status], 
count(*) as [Count]
from (
   select W.ID, min(dateforsignin) firstsignin
   from workers W
   JOIN dbo.WorkerSignins WSI ON W.ID = WSI.WorkerID
   WHERE dateforsignin >= @startDate and dateforsignin <= @endDate
   group by W.ID
) as WWW